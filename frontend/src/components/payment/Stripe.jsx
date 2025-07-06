import React from 'react'

const Stripe = () => {

  const plans = [
    {
      id: "basic",
      name: "BASIC",
      description: "For 3 month only ",
      price: 10,
      frequency: "/month",
      features: [
        "You got all the gueat lecture",
        "chance to envolve in discussion with top student ",
        "get update time to time "
      ],
      color: "text-cyan-500 border-cyan-500 bg-cyan-50",
    },
    {
      id: "standard",
      name: "STANDARD",
      description: "for 6 month only ",
      price: 50,
      frequency: "/month",
      features: [
        "resume sortlisting fast",
        "you can interact with Hr and manager of many startup",
        "You got all the gueat lecture",
        "chance to envolve in discussion with top student ",
        "get update time to time "
      ],
      color: "text-green-500 border-green-500 bg-green-50",
    },
    {
      id: "premium",
      name: "PREMIUM",
      description: " for 1 year only",
      price: 100,
      frequency: "/month",
      features: [
        "you can claim all the latest feature of premium for 1 year ",
        "resume sortlisting fast",
        "you can interact with Hr and manager of many startup",
        "You got all the gueat lecture",
        "chance to envolve in discussion with top student ",
        "get update time to time "
      ],
      color: "text-purple-500 border-purple-500 bg-purple-50",
    },
  ];

  
  const handleSelectPlan = (planId) => {
    console.log(`Selected plan: ${planId}`);
    // Placeholder for Stripe payment logic
  };
  return (
    <div>
      <div className='  text-center justify-center '>
         <h1 className='text-pretty font-bold'>SUBSCRIPTION PLAN </h1>
         <p></p>
      </div>
      <div >
      <section className="flex flex-wrap justify-center gap-8 p-9  text-white ">
      {plans.map((plan) => (
        <div
          key={plan.id}
          className={`relative flex flex-col items-center w-80 p-6 border rounded-lg shadow-lg hover:scale-105 transition-transform ${plan.color}`}
        >
          <div className="text-center mb-6">
            <h4 className={`text-xl font-semibold ${plan.color}`}>{plan.name}</h4>
            <p className="text-gray-800">{plan.description}</p>
          </div>
          <p className="text-4xl font-bold">
            ${plan.price}
            <span className="text-sm font-light text-gray-800">{plan.frequency}</span>
          </p>
          <ul className="my-6 text-gray-800 space-y-3">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <i className="fa-solid fa-check text-lg mr-3 text-white"></i>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <button
            onClick={() => handleSelectPlan(plan.id)}
            className={`absolute bottom-4 px-4 py-2 font-bold rounded-md border ${plan.color}`}
          >
            SELECT
          </button>
        </div>
      ))}
    </section>
    </div>
    </div>
  )
}

export default Stripe

