import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components

import LandingPageHeader from "components/Headers/LandingPageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import FeatureJob from "./FeatureJobs/FeatureJobs";
import HowItWorks from "./HowItWorks/HowItWorks";
function LandingPage() {
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("profile-page");
    return function cleanup() {
      document.body.classList.remove("profile-page");
    };
  });
  return (
    <>
      <LandingPageHeader />

      <div className="main">
        <FeatureJob />
        <HowItWorks />
      </div>
      <DemoFooter />
    </>
  );
}

export default LandingPage;
