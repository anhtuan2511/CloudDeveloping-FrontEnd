import React from "react";

const Home = () => {
  return (
    <>
      <div className="mx-auto">
        <main>
          <section className="text-center py-20 bg-gray-100">
            <div className="container mx-auto px-4">
              <h2 className="text-5xl font-bold mb-6">
                The most agile ERP on the planet
              </h2>
              <p className="text-lg mb-6">
                ERPNext is the world's best free and open source ERP
              </p>
              <a href="/pricing">
                <button className="bg-blue-500 text-white px-6 py-2 rounded mr-4">
                  Get Started
                </button>
              </a>

              <a href="mailto:anhtuan251101@gmail.com">
                <button className="bg-transparent text-blue-500 px-6 py-2 rounded border border-blue-500">
                  Contact Us
                </button>
              </a>
            </div>
          </section>
          <div className="w-full border-t border-gray-300"></div>
          <section className="w-full py-16 bg-white">
            <div className="container mx-auto px-4">
              <h3 className="text-3xl font-semibold text-center mb-10">
                ERPNext comes with 1000+ objects to help you run your business
              </h3>
              <div className="grid grid-cols-3 gap-8">
                {[
                  {
                    icon: "fas fa-book",
                    title: "Financial Accounting",
                    description:
                      "Get a real-time view of your cash flow. Full-fledged accounting module covering every aspect of bookkeeping.",
                  },
                  {
                    icon: "fas fa-industry",
                    title: "Manufacturing",
                    description:
                      "Effectively maintain and manage multilevel bill of materials, production planning, job cards & inventory.",
                  },
                  {
                    icon: "fas fa-headset",
                    title: "Help Desk",
                    description:
                      "Deliver a better service experience with an intuitive issue tracker and an integrated knowledge base.",
                  },
                  {
                    icon: "fas fa-shopping-cart",
                    title: "Order Management",
                    description:
                      "Increase productivity and lower costs by managing your sales and purchase cycles, from purchase to sales orders.",
                  },
                  {
                    icon: "fas fa-users",
                    title: "CRM",
                    description:
                      "Win and retain more customers by optimizing the sales process. Track leads, opportunities, and send the quotes on the go.",
                  },
                  {
                    icon: "fas fa-chart-bar",
                    title: "Asset Management",
                    description:
                      "Maintain and Manage details of assets, their movement, value adjustment, and depreciation.",
                  },
                  {
                    icon: "fas fa-user-tie",
                    title: "HR and Payroll",
                    description:
                      "Manage full employee life cycle right from onboarding, payroll, attendance, expense claims, assets to separation.",
                  },
                  {
                    icon: "fas fa-tasks",
                    title: "Projects",
                    description:
                      "Deliver both internal and external projects on time, budget, and profitability. Track tasks, timesheets, and issues by project.",
                  },
                  {
                    icon: "fas fa-globe",
                    title: "Website",
                    description:
                      "ERPNext comes with fully-featured content management with blogs, web pages, and forms.",
                  },
                ].map((feature, index) => (
                  <div key={index} className="text-center">
                    <i
                      className={`${feature.icon} text-4xl text-blue-500 mb-4`}
                    ></i>
                    <h4 className="text-xl font-semibold mb-2">
                      {feature.title}
                    </h4>
                    <p>{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <div className="w-full border-t border-gray-300"></div>
        </main>
      </div>
    </>
  );
};
export default Home;
