use aiken/crypto.{VerificationKeyHash}
use cardano/address
use cardano/assets.{lovelace_of, without_lovelace}
use cardano/transaction.{
  InlineDatum, Output, OutputReference, Transaction, find_input,
}
use cip68generator/types.{Remove, StoreRedeemer, Update}
use cip68generator/utils
use types/cip68.{CIP68}
use validation/find.{output_by_addr_value}

// @validator: Store
// @title: Open source dynamic assets (Token/NFT) generator (CIP68)
// @description: Validator is used to update and remove tokens (nft, token) according to CIP68
// @params - platform: The address when users operate with the platform, they will have to pay a platform maintenance fee.
// @params - platform_fee: The minimum amount a user must pay to the platform when interacting with the platform.
// @params - issuer: 
validator store(
  platform: VerificationKeyHash,
  platform_fee: Int,
  issuer: VerificationKeyHash,
) {
  spend(
    datum: Option<CIP68>,
    redeemer: StoreRedeemer,
    output_reference: OutputReference,
    transaction: Transaction,
  ) {
    expect Some(datum_output) = datum
    let Transaction { inputs, outputs, extra_signatories, .. } = transaction
    let platform_address = address.from_verification_key(platform)
    let output_utxo_platform =
      utils.find_output(outputs, platform_fee, platform_address)
    expect Some(input) = find_input(inputs, output_reference)
    let script_address = input.output.address
    let reference_token =
      input.output.value
        |> without_lovelace()
    when redeemer is {
      // @action: Update - Condition for update assets
      // signed_by_author: When a user updates an asset, there is an author field in the datum of the store validator. At the same time, the user must also provide a signature to update the fields in the datum to change the asset's metadata.
      // - amount_tx_outputs: Check the transaction output which has a quantity of 3 (1 utxo sent to the store validator, 1 utxo sent to the platform address, and utxo is the author's address).
      // - check_store_address: Check that the reference token used to change metadata exists and is sent to the store validator's address.
      // - check_format_metadata: Check that the specified fields such as name, image, media_type, author exist in the store validator's datum (aka asset metadata). These fields are required. The value of author cannot be changed.
      // - check_platform_fee: Check in the transaction output that the utxo contains the minimum platform fee and is sent to the platform address defined in params.
      // check_reference_token: Check the token to update the metadata that exists in the transaction output.
      Update -> {
        let validator_output =
          output_by_addr_value(outputs, script_address, reference_token)
        expect InlineDatum(datum_input) = validator_output.datum
        let metadatum_output: CIP68 = datum_output
        expect metadatum_input: CIP68 = datum_input
        expect author_input: ByteArray =
          cip68.get(metadatum_input, types.author_key)
        expect author_output: ByteArray =
          cip68.get(metadatum_output, types.author_key)
        let check_author = author_input == author_output
        and {
          utils.check_output_utxo(validator_output, issuer, extra_signatories)?,
          output_utxo_platform != None,
          check_author,
        }
      }
      // @action: Remove - Condition for remove assets
      //- signed_by_author: When the user performs asset removal, the datum of the store validator contains the author field and the user must provide a signature to identify that this is the author who performed the asset minting transaction. This condition is performed by comparing the signature entered in the datum of the store validator.
      // - Check in the transaction output that there exists an utxo containing the platform's minimum fee and is sent to the platform's address defined in params.
      // - The transaction output has a quantity of 2 (1 utxo of the platform address, 1 utxo of the author)
      Remove -> {
        expect InlineDatum(datum_input) = input.output.datum
        expect metadatum_input: CIP68 = datum_input
        expect author_input: ByteArray =
          cip68.get(metadatum_input, types.author_key)
        let author_address = address.from_verification_key(author_input)
        let output_utxo_author =
          utils.find_output(
            outputs,
            lovelace_of(input.output.value),
            author_address,
          )
        let check_remove_asset =
          utils.check_remove_asset(inputs, extra_signatories)
        and {
          check_remove_asset?,
          output_utxo_author != None,
          output_utxo_platform != None,
        }
      }
    }
  }

  else(_) {
    fail
  }
}
