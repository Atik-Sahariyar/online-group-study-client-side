import Footer from "../Shared/Footer";
import Banner from "./Banner";
import Faq from "./Faq";
import Features from "./Features";

const Home = () => {

    return (
       <div>
         <div className="mx-5 md:mx-8 lg:mx-10">
            <Banner></Banner>
            <Features></Features>
            <Faq></Faq>
            
        </div>
        <Footer></Footer>
       </div>
    );
};

export default Home;