import React from 'react';
import {CheckIcon} from "lucide-react";

function PricingCards({redirect}: {redirect: boolean}) {
    const plans = [
        {
            name: "Starter",
            id: "starter",
            href: "#",
            priceMonthly: null,
            description: "Get started with our platform",
            features: [
                "20 messages chat limit in chats",
                "2 participant limit in chats",
                "3 chat rooms limit",
                "24 hour support response time",
                "Supports 2 languages",
            ]
        },
        {
            name: "Pro",
            id: "pro_5656532",
            href: "#",
            priceMonthly: "10$",
            description: "Unlock the full potential of our platform",
            features: [
                "Unlimited messages in chats",
                "Unlimited participants in chats",
                "Unlimited chat rooms",
                "1 hour support response time",
                "Supports up to 10 languages",
            ]
        }
    ];

    return (
        <div>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-4xl lg:grid-cols-2">
                    {
                        plans.map((plan) => (
                            <div key={plan.id} className="flex flex-col justify-between rounded-3xl bg-white p-8 shadow-xl ring-1 ring-gray-900/10 sm:p-10">
                                <div>
                                    <h3 id={plan.id + plan.name}
                                         className="text-base font-semibold leading-7 text-indigo-600">{plan.name}
                                    </h3>
                                    <div className="mt-4 flex items-baseline gap-x-2">
                                        {
                                            plan.priceMonthly ? (
                                                <>
                                                    <span className="text-5xl font-bold tracking-tight text-gray-900">{plan.priceMonthly}</span>
                                                    <span className="text-base font-semibold leading-7 text-gray-600">/month</span>
                                                </>
                                            ) : (
                                                <span className="text-5xl font-bold tracking-tight text-gray-900">Free</span>
                                            )
                                        }
                                    </div>
                                    <p className="mt-6 text-base leading-7 text-gray-600">{plan.description}</p>
                                    <ul role="list" className="mt-10 space-y-4 text-sm leading-6 text-gray-600">
                                        {
                                            plan.features.map((feature) => (
                                                <li key={feature} className="flex gap-x-3">
                                                    <CheckIcon className="h-6 w-5 flex-none text-indigo-700"/>
                                                    {feature}
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                                {
                                    redirect ? (
                                        <a
                                            className="mt-8 block rounded-md bg-indigo-600 px-3.5 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer disabled:opacity-80"
                                            href="/register">
                                            Get started today
                                        </a>
                                    ) : (
                                        <button
                                            className="mt-8 block rounded-md bg-indigo-600 px-3.5 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer disabled:opacity-80"
                                        >
                                            Get started today
                                        </button>
                                    )
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default PricingCards;