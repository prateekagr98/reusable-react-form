### Select

Select export two variations `Single Select` and `Multi Select`.

Both Selects offer `is_creatable` option to allow users to create a new option in case one doesn't exist in the option list.

#### Single Select

##### Usage
```
<SingleSelect
  options={options}
  help_text="This is a Help Text"
  value="blueberry" />
```

##### Handlers

- `handleOnOptionSelection`: Triggered on every selection and also when user moves out of the field.
- Details on values received via hooks can be viewed in the `Actions` tab.


#### Multi Select

##### Usage
```
<MultiSelect
  options={options}
  help_text="This is a Help Text"
  pre_selection={[options[0], options[3]]} />
```

##### Handlers
- `handleOnOptionSelection`: Triggered on every selection and also when user moves out of the field.
- `handleOnOptionRemove`: Triggered when user removes a selected option.