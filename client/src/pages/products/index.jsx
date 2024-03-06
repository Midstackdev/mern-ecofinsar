import { Box, useMediaQuery } from "@mui/material";
import Header from "components/Header";
import Product from "components/Product";
import React from "react";
import { useGetProductsQuery } from "state/api";

const Products = () => {
  const { data, isLoading } = useGetProductsQuery();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PRODUCTS" subtitle="see your list of products" />
      {data || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{ "& > div": { gridColumn: isNonMobile ? undefined : "span 4" } }}
        >
          {data.map(
            ({ products, _id: id, yearlyTotalSoldUnits, yearlySalesTotal }) => (
              <Product
                key={id}
                product={products}
                sales={yearlySalesTotal}
                sold={yearlyTotalSoldUnits}
              />
            )
          )}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};

export default Products;
