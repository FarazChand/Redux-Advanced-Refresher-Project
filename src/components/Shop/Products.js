import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const prodictList = [
  {
    title: "First Book",
    price: 6.99,
    description: "This is my first book.",
    id: "p1",
  },
  {
    title: "Second Book",
    price: 7.99,
    description: "This is my second book.",
    id: "p2",
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {prodictList.map((product) => {
          return (
            <ProductItem
              title={product.title}
              price={product.price}
              description={product.description}
              key={product.id}
              id={product.id}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default Products;
