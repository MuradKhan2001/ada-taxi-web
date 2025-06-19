import Home from "./components/Home/Home";
import OfferApp from "./components/offer-app/OfferApp";
import PrivacyPolicy from "./components/privacy-policy/PrivacyPolicy";
import AboutApp from "./components/about-app/AboutApp";

export const publicRoutes = [
    {
        path: "/",
        element: <Home/>
    }, {
        path: "/offer-app",
        element: <OfferApp/>
    },
    {
        path: "/privacy-policy",
        element: <PrivacyPolicy/>
    },
    {
        path: "/about-app",
        element: <AboutApp/>
    }
];