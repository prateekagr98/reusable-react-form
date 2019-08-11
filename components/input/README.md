### Input
This is a input field with allowed types as text, number and email.

#### Usage
```
<Input
  type="text"
  help_text="This is a mandatory field"
  show_text_counter
  required />
```

#### Handlers

- `handleOnInputChange`: Triggered on every input change.
- `handleOnInputBlur`: Triggered when user moves out of the input box. Suggested way to get the final value of input.
- `customValidation`: Triggered on every input. Function receives the current entered text and expects an error string in case of any validation failures else empty string | null | undefined.