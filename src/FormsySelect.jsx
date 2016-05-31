import React from 'react';
import Formsy from 'formsy-react';
import SelectField from 'material-ui/SelectField';
import { setMuiComponentAndMaybeFocus } from './utils';

const FormsySelect = React.createClass({

  propTypes: {
    children: React.PropTypes.node,
    name: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func,
    value: React.PropTypes.any,
  },

  mixins: [Formsy.Mixin],

  getInitialState() {
    return {
      hasChanged: false,
    };
  },
  
  handleChange(event, index, value) {
    this.setValue(value);

    this.setState({
      hasChanged: value !== '',
      canShowError: true
    });

    if (this.props.onChange) this.props.onChange(event, value, index);
  },

  handleBlur: function handleBlur(event) {
    this.setState({
      canShowError: true
    });
  },

  setMuiComponentAndMaybeFocus: setMuiComponentAndMaybeFocus,

  render() {
    let { value, ...rest } = this.props;
    value = this.state.hasChanged ? this.getValue() : value;

    return (
      <SelectField
        {...rest}
        errorText={this.state.canShowError ? this.getErrorMessage() : undefined}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        ref={this.setMuiComponentAndMaybeFocus}
        value={value}
      >
        {this.props.children}
      </SelectField>
    );
  },
});

export default FormsySelect;
