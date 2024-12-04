import { appImage } from "@/public/images";
import { LucideIcon, LucideProps } from "lucide-react";
import Image from "next/image";
export type Icon = LucideIcon;
export const Images = {
  logo: (props: LucideProps) => (
    <Image src={appImage.logo} className={props.className} alt="Logo" />
  ),
  metadata: (props: LucideProps) => (
    <Image src={appImage.metadata} className={props.className} alt="metadata" />
  ),
  marketplace: (props: LucideProps) => (
    <Image
      src={appImage.marketplace}
      className={props.className}
      alt="metadata"
    />
  ),
  collection: (props: LucideProps) => (
    <Image
      src={appImage.collection}
      className={props.className}
      alt="Collection"
    />
  ),
  storegae: (props: LucideProps) => (
    <Image src={appImage.storegae} className={props.className} alt="metadata" />
  ),

  mintOne: (props: LucideProps) => (
    <Image src={appImage.mintOne} className={props.className} alt="metadata" />
  ),

  mintMany: (props: LucideProps) => (
    <Image
      src={appImage.mintMany}
      className={props.className}
      alt="mintMany"
    />
  ),

  startFromScratch: (props: LucideProps) => (
    <Image
      src={appImage.startFromCratch}
      className={props.className}
      alt="Start from Scratch"
    />
  ),
};
