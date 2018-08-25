import { releaseToken, requestTokenForClass } from "class-references";
import * as React from "react";

interface IProps {
  children: any;
  classNameToAdd: string;
  element: HTMLElement;
}

interface IState {
  token: number;
}

export default class ClassReference extends React.Component<IProps, IState> {
  public componentDidMount() {
    this.setState({
      token: requestTokenForClass(this.props.element, this.props.classNameToAdd)
    });
  }

  public componentDidUpdate(prevProps: IProps) {
    const { classNameToAdd, element } = this.props;
    const { token } = this.state;

    if (
      prevProps.element !== element ||
      prevProps.classNameToAdd !== classNameToAdd
    ) {
      releaseToken(prevProps.element, token);

      this.setState({
        token: requestTokenForClass(element, classNameToAdd)
      });
    }
  }

  public componentWillUnmount() {
    releaseToken(this.props.element, this.state.token);
  }

  public render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}
