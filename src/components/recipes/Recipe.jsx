import React, { useContext, useEffect, useState } from "react";
import Header from "../Header";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import {
  selectAllRecipes,
  selectLoading,
  selectRecipeCategory,
} from "../../features/recipeSlice/ingredientSlice";
import Pagination from "../Pagination";
import SearchForms from "../SearchForms";
import { useSelector } from "react-redux";
import { SearchContext } from "../../context/Context";
import Footer from "../Footer";
import Loading from "../Loading";
import recipeImg from "../../assets/recipe.jpeg";

const Recipe = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const getActiveRecipe = useSelector(selectRecipeCategory);
  const getFilteredRecipe = useSelector(selectAllRecipes);
  const { shortenText } = useContext(SearchContext);
  const [activeRecipe, setActiveRecipe] = useState(getActiveRecipe);
  const loading = useSelector(selectLoading);

  //Define the pagination settings for displaying the list ingredients
  const listRecipesPerPage = 12;
  const nPagesVisited = pageNumber * listRecipesPerPage;

  //   //Calculates the number of pages to be displayed
  const pageCount = getFilteredRecipe
    ? Math.ceil(getFilteredRecipe.length / listRecipesPerPage)
    : 0;

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  //   //This logic helps render list of ingredients based on pagi9nation
  const displaySearchedRecipes =
    getFilteredRecipe &&
    getFilteredRecipe
      .slice(nPagesVisited, nPagesVisited + listRecipesPerPage)
      ?.map((list) => {
        const { idMeal, strMeal, strMealThumb } = list;

        return (
          <aside
            className="w-[100%] relative md:w-[30%] flex-auto h-[200px] rounded-[20px] group"
            key={idMeal}
          >
            <img
              src={strMealThumb}
              alt="yam"
              className="w-full h-[200px] object-cover rounded-[20px] md:w-full md:h-[200px] md:object-cover md:rounded-[20px]"
            />
            <div className="absolute top-0 bottom-0 inset-0 bg-[#5f68687c] opacity-50 rounded-[15px] shadow-lg group-hover:opacity-100"></div>
            <div className="absolute top-0 bottom-0 w-full flex-col justify-center items-center opacity-100 ">
              <div className="absolute top-0 bottom-0 flex justify-center w-8/12 h-[40px] items-center bg-[#18b648] rounded-br-[30px]">
                <p className="text-[#fff] text-[15px] font-bold ">
                  {shortenText(strMeal, 20)}
                </p>
              </div>

              <div className="absolute top-20 bottom-0 w-full flex items-center justify-center h-[50px] opacity-0 group-hover:opacity-100">
                <div className="flex justify-center items-center w-5/12 h-[40px] bg-[#18b648]  cursor-pointer rounded-sm">
                  <Link to={`/recipe/${idMeal}`}>
                    <p className="text-[#fff] font-bold">View More</p>
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        );
      });

  return (
    <main>
      <Navbar />
      <Header />
      <SearchForms />

      <div className="flex justify-between max-w-[1340px] px-10 mt-[30px] mx-auto items-center">
        <div className="flex flex-wrap items-center w-full flex-shrink">
          <div className="mt-3 w-[810px] flex-auto items-center  md:w-[810px] md:flex-auto md:flex md:items-center">
            <div className="max-sm:flex-row flex flex-wrap w-full items-center gap-6">
              <h1 className="text-[30px] text-[#999]">Recipes</h1>
              <div className="max-sm:w-[67.9%] w-[88.9%] border border-b border-l-transparent border-r-transparent border-t-transparent border-[#999]"></div>
            </div>
          </div>
        </div>
      </div>

      <section className="flex max-w-[1340px] h-full px-10 mx-auto mt-[40px] items-center">
        {/*Category button*/}
        <div className="flex flex-wrap flex-shrink w-full h-full gap-10">
          {loading ? (
            <Loading />
          ) : (
            <div className="max-sm:w-[810px] max-sm:flex max-sm:flex-col max-sm:flex-auto max-sm:gap-6 md:w-[100%] md:flex md:flex-wrap   md:gap-6 md:h-full pb-20">
              {displaySearchedRecipes ? (
                displaySearchedRecipes
              ) : (
                <div className="flex items-center justify-center w-full h-screen">
                  <div className="relative flex items-center justify-center">
                    <img
                      src={recipeImg}
                      className="w-[50%] h-[50%]"
                      alt="Not Available"
                    />
                  </div>
                  <div className="absolute px-[370px] pt-[500px] bottom-[-350px] flex justify-center items-center z-50">
                    <p className="text-[#999] font-bold">
                      No RECIPES AVAILABLE
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {!displaySearchedRecipes ? null : (
        <Pagination pageCount={pageCount} changePage={changePage} />
      )}
      <Footer />
    </main>
  );
};

export default Recipe;
