import { claimForClass, release } from "class-references";
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
      token: claimForClass(this.props.element, this.props.classNameToAdd)
    });
  }

  public componentDidUpdate(prevProps: IProps) {
    const { classNameToAdd, element } = this.props;
    const { token } = this.state;

    if (
      prevProps.element !== element ||
      prevProps.classNameToAdd !== classNameToAdd
    ) {
      release(prevProps.element, token);

      this.setState({
        token: claimForClass(element, classNameToAdd)
      });
    }
  }

  public componentWillUnmount() {
    release(this.props.element, this.state.token);
  }

  public render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}
