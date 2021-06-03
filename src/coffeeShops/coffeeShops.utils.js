export const processCategories = (categories) => {
  const categoriesArr = categories.split(",").map((item) => item.replace(/\,/g, ""))
  return categoriesArr.map((item) => {
    return {
      where: {
        name: item.replace(/^\s+/g, "")
      },
      create: {
        name: item.replace(/^\s+/g, ""),
        slug: item.toLowerCase().replace(/^\s+/g, "").replace(/\s/g, "-")
      }
    }
  })
}