

const Faq = () => {
    const faqData = [
        {
          question: 'How can I prepare for technical interviews?',
          answer: 'Preparing for technical interviews involves practicing coding problems, data structures, and algorithms. Utilize online coding platforms, participate in mock interviews, and study common interview questions. Additionally, consider joining coding communities and attending workshops to enhance your problem-solving skills.',
        },
        {
          question: 'Is it important to contribute to open-source projects?',
          answer: 'Contributing to open-source projects is highly beneficial. It allows you to collaborate with experienced developers, gain real-world coding experience, and build a portfolio. Moreover, open-source contributions demonstrate your skills to potential employers and provide networking opportunities within the developer community.',
        },
        {
          question: 'What are some popular career paths for CSE graduates?',
          answer: 'CSE graduates have diverse career opportunities. Some popular paths include software development, data science, cybersecurity, artificial intelligence, and web development. You can also explore roles in database administration, network engineering, and game development. Research different fields, identify your interests, and focus on gaining relevant skills.',
        },
        {
          question: 'How can I balance academics and personal projects?',
          answer: 'Balancing academics and personal projects requires effective time management. Create a schedule that allocates specific time blocks for studying, attending classes, and working on personal projects. Set realistic goals, prioritize tasks, and avoid overcommitting. Additionally, seek guidance from mentors and professors to manage your workload effectively.',
        },
        {
          question: 'Are there resources for learning advanced topics like machine learning and blockchain?',
          answer: 'Yes, there are numerous online resources for learning advanced topics. You can enroll in online courses, join specialized forums, and read research papers. Platforms like Coursera, edX, and Khan Academy offer in-depth courses on machine learning, blockchain, and other advanced subjects. Additionally, consider joining coding bootcamps or specialized workshops for hands-on learning experiences.',
        }
        
      ];
    return (
        <section className="bg-gray-100 py-10 mt-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Frequently Asked Questions </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
};

export default Faq;