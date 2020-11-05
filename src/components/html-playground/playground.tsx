import { Component, Element, Prop, h } from '@stencil/core';
import { whiskers } from '../../utils/whiskers';

export interface PlaygroundControl {
  name: string;
  type: string;
  value: any;
  options?: string[]; // select
  min?: number; // range
  max?: number; // range
  step?: number; //range
}

@Component({
  tag: 'html-playground',
  styleUrl: 'playground.css',
  shadow: true
})
export class Playground {
  @Element() host: HTMLElement;

  /**
   * One or more controls to provide to the playground. Each control has a name, type, and value. The { name: value }
   * pair will be made available to the template's context.
   */
  @Prop({ mutable: true }) controls: PlaygroundControl[] = [];

  /**
   * The template to render. Templates use Mustache syntax and get their context (i.e. view data) from the data provided
   * in the registered controls.
   */
  @Prop() template = '';

  camelToSpace(text: string) {
    return text.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) {
      return str.toUpperCase();
    });
  }

  renderPreview() {
    const context = {};
    this.controls.map(control => (context[control.name] = control.value));

    let html = ';';
    try {
      html = whiskers.render(this.template, context);
    } catch (err) {
      html = err;
    }

    return html;
  }

  setControlValue(name: string, newValue: any) {
    this.controls[name] = newValue;
    this.controls = [
      ...this.controls.map(prop => {
        if (prop.name === name) prop.value = newValue;
        return prop;
      })
    ];
  }

  render() {
    return (
      <div class="playground">
        <div class="playground__main">
          <div class="playground__preview" innerHTML={this.renderPreview()}>
            <slot />
          </div>
          <div class="playground__controls">
            {this.controls.map(control => (
              <div class={`playground__control playground__control--${control.type}`}>
                <label>
                  <span class="playground__control-name">{this.camelToSpace(control.name)}</span>

                  {control.type === 'text' && (
                    <input type="text" name={control.name} value={control.value} onInput={event => this.setControlValue(control.name, (event.target as HTMLInputElement).value)} />
                  )}

                  {control.type === 'color' && (
                    <input type="color" name={control.name} value={control.value} onInput={event => this.setControlValue(control.name, (event.target as HTMLInputElement).value)} />
                  )}

                  {control.type === 'boolean' && (
                    <input
                      type="checkbox"
                      name={control.name}
                      checked={control.value + '' === 'true'}
                      onClick={event => this.setControlValue(control.name, (event.target as HTMLInputElement).checked)}
                    />
                  )}

                  {control.type === 'range' && (
                    <input
                      type="range"
                      name={control.name}
                      min={control.min}
                      max={control.max}
                      step={control.step}
                      value={control.value}
                      onInput={event => this.setControlValue(control.name, (event.target as HTMLInputElement).value)}
                    />
                  )}

                  {control.type === 'select' && (
                    <select
                      name={control.name}
                      onInput={event => this.setControlValue(control.name, (event.target as HTMLSelectElement).options[(event.target as HTMLSelectElement).selectedIndex].value)}
                    >
                      {control.options.map(value => (
                        <option value={value} selected={value === control.value}>
                          {value}
                        </option>
                      ))}
                    </select>
                  )}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
