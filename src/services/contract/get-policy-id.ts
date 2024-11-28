"use server";

import { Cip68Contract } from "@/contract";

export const getContractPolicyId = async () => {
  return new Cip68Contract({}).policyId;
};
