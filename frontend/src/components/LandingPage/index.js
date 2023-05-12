import "./LandingPage.css"
import Nav from "./Nav"
import SectionOne from "./SectionOne";
import SectionTwo from "./SectionTwo";
import SectionThree from "./SectionThree";

function LandingPage() {
    return (
        <div className="landing-page-main-wrapper">
            <Nav />
            <SectionOne />
            <SectionTwo />
            <SectionThree />
        </div>
    )
}

export default LandingPage;
