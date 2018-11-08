import React, { Component } from "react";
import { Route } from "react-router-dom";

import Start from "./Start";
import LoginRedux from "./LoginRedux";
import OwnerLoginRedux from "./OwnerLoginRedux";
import SignUpRedux from "./SignUpRedux";
import OwnerSignUpRedux from "./OwnerSignUpRedux";
import UserProfileRedux from "./UserProfileRedux";
import SearchPropertyRedux from "./SearchPropertyRedux";
import HomeRedux from "./HomeRedux";
import HomeOwnerRedux from "./HomeOwnerRedux";
import FullDetailsRedux from "./FullDetailsRedux";
import OwnerDashboardRedux from "./OwnerDashBoardRedux";
import TravellerDashboardRedux from "./TravellerDashboardRedux";
import PropertyNewRedux from "./PropertyNewRedux";
import Messaging from "./Messaging";
import OwnerProfileRedux from "./OwnerProfileRedux";
import OwnerMessaging from "./OwnerMessaging";
class Main extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Start} />
        <Route path="/loginredux" component={LoginRedux} />
        <Route path="/ownerloginredux" component={OwnerLoginRedux} />
        <Route path="/signupredux" component={SignUpRedux} />
        <Route path="/ownersignupredux" component={OwnerSignUpRedux} />
        <Route path="/userprofileredux" component={UserProfileRedux} />
        <Route path="/ownerprofileredux" component={OwnerProfileRedux} />
        <Route path="/searchpropertyredux" component={SearchPropertyRedux} />
        <Route path="/homeredux" component={HomeRedux} />
        <Route path="/homeownerredux" component={HomeOwnerRedux} />

        <Route path="/fulldetailsredux" component={FullDetailsRedux} />
        <Route path="/ownerdashboardredux" component={OwnerDashboardRedux} />

        <Route
          path="/travellerdashboardredux"
          component={TravellerDashboardRedux}
        />
        <Route path="/propertynewredux" component={PropertyNewRedux} />
        <Route path="/Messaging" component={Messaging} />
        <Route path="/ownermessaging" component={OwnerMessaging} />
      </div>
    );
  }
}

export default Main;
