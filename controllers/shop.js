exports.getShopsData = (req, res, next) => {
  res.status(200).json({
    shops: [
      {
        id: "123",
        ownerId: "Yong",
        shopName: "Yong's",
        imageUrl: "",
        description: "설명",
        hasParkingLot: "true",
        hasTables: "false",
      },
    ],
  });
};
