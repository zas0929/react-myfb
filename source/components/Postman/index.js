import React from "react";
import { Transition } from "react-transition-group";
import { fromTo, TweenLite } from "gsap";

import Styles from "./styles.m.css";
import { withProfile } from "components/HOC/withProfile";

const Postman = (props) => {
  return (
    <Transition
      appear
      in
      onEnter={(postman) => fromTo(postman, 0.5, { opacity: 0, skewX: 50 }, { opacity: 1, skewX: 0 })}
      // onEntered={(postman) => fromTo(postman, 0.5, { opacity: 1, right: 0 }, { opacity: 0, right: -200 })}
      onEntered={(postman) => setTimeout(() => fromTo(postman, 0.5, { opacity: 1, right: 0 }, { opacity: 0, right: -200 }), 3000)}
      timeout={ 1000 }
    >
      <section className={ Styles.postman }>
        <img src={ props.avatar } />
        <span>Welcome online, {props.currentUserFirstName}</span>
      </section>
    </Transition>
  );
};

export default withProfile(Postman);
