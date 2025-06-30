import Home from "./components/Home/Home";
import OfferApp from "./components/offer-app/OfferApp";
import PrivacyPolicy from "./components/privacy-policy/PrivacyPolicy";
import AboutApp from "./components/about-app/AboutApp";
import DriverApp from "./components/driver-app/DriverApp";
import ClientApp from "./components/client-app/ClientApp";

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
    },
    {
        path: "/driver-app",
        element: <DriverApp/>
    },
    {
        path: "/client-app",
        element: <ClientApp/>
    },
];