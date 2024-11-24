const router = {
  landing: "/",
  metadata: "/dashboard/metadata",
  storages: "/dashboard/storages",
  mint: "/dashboard/mint",
  document: "/document",
} as const;

export default router;

export const publicRoutes = [
  { name: "Home", redirect: router.landing },
  { name: "Mint", redirect: router.mint },
  { name: "Metadata", redirect: router.metadata },
  { name: "Storages", redirect: router.storages },
  { name: "Documentation", redirect: router.document },
];

export const dashboardRoutes = {
  home: {
    redirect: "/dashboard",
  },
  mint: {
    redirect: "/dashboard/mint",
    children: {
      mintOne: {
        redirect: "/dashboard/mint/one",
      },
      mintMultiple: {
        redirect: "/dashboard/mint/multiple",
      },
    },
  },
  utilities: {
    redirect: "/dashboard/utilities",
    children: {
      collection: {
        redirect: "/dashboard/utilities/collection",
      },
      storage: {
        redirect: "/dashboard/utilities/storage",
        children: {
          uploadFile: {
            redirect: "/dashboard/utilities/storage/upload/one",
          },
          uploadFolder: {
            redirect: "/dashboard/utilities/storage/upload/many",
          },
        },
      },
      fastCollection: {
        redirect: "/dashboard/utilities/fast-collection",
      },
    },
  },
};
