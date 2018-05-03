export class FormModel<T> {
    value?: T;
    key: string;
    label: string;
    required: boolean;
    controlType: string;
    type?: string;
    placeholder?: string;    
    options?: {key: string, value: string}[];

    constructor(options: {
        value?: T,
        key?: string,
        label?: string,
        required?: boolean,
        order?: number,
        placeholder?: string,    
        controlType?: string
        } = {}) {
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.required = !!options.required;
        this.controlType = options.controlType || '';
        if(this.controlType == 'textbox'){
            this.type = 'textbox';
        }
        if(this.controlType == 'dropdown' || this.controlType == 'radio'){
            this.options = options['options'] || [];
        }
    }
}