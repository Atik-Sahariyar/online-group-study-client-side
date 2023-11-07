import { Link } from "react-router-dom";


const Footer = () => {
  return (
    <footer className="bg-gray-700 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="footer-logo">
        <img className=" w-20 h-20 rounded-full ml-10" src="https://i.ibb.co/G7dr43F/logo.jpg" alt="" />
        </div>
        <div className="footer-links space-x-6 mt-4 md:mt-0">
          <Link  to = '/' className="hover:text-gray-400">Home</Link>
          <Link  to = 'assignments' className="hover:text-gray-400">All Assignments</Link>
          <Link  to = '' className="hover:text-gray-400">Courses</Link>
          <Link  to = '' className="hover:text-gray-400">Contact</Link>
        </div>
        <div className="footer-info text-center mt-4 md:mt-0">
          <p className="mb-2">Sector 11, Road 2</p>
          <p className="mb-2">Uttara, dhaka, 1230</p>
          <p className="mb-2">Email: info@atik.com</p>
          <p>Phone: 8801797****19</p>
        </div>
        <div className="footer-social space-x-4 mt-4 md:mt-0">
          <a href="#" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
      <div className="text-center mt-4">
        <p>&copy; 2023 Online Group Study. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
