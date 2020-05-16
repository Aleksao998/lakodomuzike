export const addAddData = (
  addsName = "",
  type = "",
  description = "",
  date = "",
  time = "",
  priceFrom = "",
  priceTo = "",
  location = "",
  number = "",
  city = "",
  link = ""
) => {
  return {
    type: "ADD_ADD_DATA",
    item: {
      addsName: addsName,
      type: type,
      description: description,
      date: date,
      time: time,
      priceFrom: priceFrom,
      priceTo: priceTo,
      location: location,
      number: number,
      city: city,
      link: link,
    },
  };
};
