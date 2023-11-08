const ErrorPage = () => {
    return (
        <div>
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                <img src="https://i.ibb.co/F5K1M8z/error-page-img.png" alt="" />
                <h2 className="text-3xl text-gray-800 mb-2">Page Not Found</h2>
               <p className="text-base text-gray-600">Sorry, the page you are looking for does not exist.</p>
            </div>
        </div>
    );
};

export default ErrorPage;