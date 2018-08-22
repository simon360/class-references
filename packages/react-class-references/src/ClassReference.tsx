import * as React from "react";
import { claimForClass, release } from "class-references";

interface Props {
  children: any;
  classNameToAdd: string;
  element: HTMLElement;
}

interface State {
  token: number;
}

export class ClassReference extends React.Component<Props, State> {
  componentDidMount() {
    this.setState({
      token: claimForClass(this.props.element, this.props.classNameToAdd)
    });
  }

  componentDidUpdate(prevProps: Props) {
    const { classNameToAdd, element } = this.props;
    const { token } = this.state;

    if (
      prevProps.element !== element ||
      prevProps.classNameToAdd !== classNameToAdd
    ) {
      if (token) {
        release(prevProps.element, token);
      }

      this.setState({
        token: claimForClass(element, classNameToAdd)
      });
    }
  }

  componentWillUnmount() {
    release(this.props.element, this.state.token);
  }

  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}
