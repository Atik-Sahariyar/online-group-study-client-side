
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { NavLink } from 'react-router-dom';


const Banner = () => {
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    const slides = [
        {
            id: 1,
            title: 'Join Our Online Group Study!',
            description: 'Collaborate with others, learn together, and achieve academic success.',
            buttonText: 'Join Now',
            imageUrl: 'https://i.ibb.co/rkQ6grD/Introduction-To-Algorithm-1-1.jpg',
        },
        {
            id: 2,
            title: 'Interactive Learning Sessions',
            description: 'Engage in live discussions, quizzes, and group activities with peers and mentors.',
            buttonText: 'Explore Now',
            imageUrl: 'https://i.ibb.co/7nmwXy4/Interactive-Learning-Sessions.jpg',
        },
        {
            id: 3,
            title: 'Expert Tutors and Study Materials',
            description: 'Access high-quality study materials and get guidance from experienced tutors.',
            buttonText: 'Get Started',
            imageUrl: 'https://i.ibb.co/QkvVLxL/Web-Development-Project.jpg', 
        },
    ];

    return (
        <Slider {...sliderSettings}>
            {slides.map((slide) => (
                <div key={slide.id} className="relative bg-cover bg-center h-[400px]">
                    <img src={slide.imageUrl} alt={`Slide ${slide.id}`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-opacity-75 bg-black text-white p-8">
                        <h1 className="text-4xl font-bold mb-4">{slide.title}</h1>
                        <p className="text-lg mb-6">{slide.description}</p>
                    
                            <NavLink to ="/assignments">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full">
                                    {slide.buttonText}
                                </button>
                            </NavLink>
                     
                    </div>
                </div>
            ))}
        </Slider>
    );
};

export default Banner;
