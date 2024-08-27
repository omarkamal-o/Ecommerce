import { useEffect, useState } from "react";
import axios from "axios";
import './Categories.css';
import "../../Components/Loader/Loader"
import { Helmet } from "react-helmet";

export default function Categories() {
  const [categories, setCategories] = useState(null);

  async function getCategories() {
    let response = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    setCategories(response?.data?.data);
  }

  async function getSpecificCategory(id) {
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`);
    console.log(data); 
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <div className="row justify-center my-5 ">
      <Helmet>
        <title>Categories</title>
      </Helmet>
        <div className="card-container">
          {categories?.map((category) => (
            <div
              key={category._id}
              onClick={() => getSpecificCategory(category._id)} 
              className="card category-container border"
            >
              <div className="card-img rounded-sm">
                <img className="category" src={category.image} alt={category.name} />
              </div>
              <div className="card-body">
                <h2 className="text-green-700 text-2xl font-medium">{category.name}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
