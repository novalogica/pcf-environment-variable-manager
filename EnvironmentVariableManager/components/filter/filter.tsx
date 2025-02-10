import * as React from "react";
import { ChangeEvent, useState } from "react";
import { Input, Dropdown, Label, Option } from "@fluentui/react-components";
import { DataFunnelRegular, SearchRegular, FilterRegular } from "@fluentui/react-icons";
import type { SelectionEvents, OptionOnSelectData } from "@fluentui/react-combobox";
import { EnvTypes } from "../../interfaces/environment-variables";
import { typeOptions, valueOptions } from "../../constants/filter-options";

interface IFilterSectionProps {
  filterText: string;
  setFilterText: (text: string) => void;
  setTypeFilter: (value: string) => void;
  setValueFilter: (value: string) => void;
}

export const FilterSection = ({
  filterText,
  setFilterText,
  setTypeFilter,
  setValueFilter,
}: IFilterSectionProps) => {
  const [selectedType, setSelectedType] = useState<string>("");

  const handleDropdownChange =
    (setter: (value: string) => void, isTypeDropdown: boolean = false) =>
    (_event: SelectionEvents, data: OptionOnSelectData) => {
      if (data.selectedOptions.length > 0) {
        const selectedValue = data.selectedOptions[0];
        setter(selectedValue);
        if (isTypeDropdown) {
          setSelectedType(selectedValue);
        }
      }
    };

  return (
    <div className="filter-section">
      <div className="filter-header">
        <DataFunnelRegular className="filter-title-icon" />
        <h2 className="filter-title">Filters</h2>
      </div>
      <div className="filter-grid">
        <div className="filter-group">
          <Label weight="semibold" className="filter-label">
            <SearchRegular className="label-icon" />
            <span>Search Parameters</span>
          </Label>
          <Input
            type="search"
            placeholder="Search by Schema Name or Display Name"
            value={filterText}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setFilterText(e.target.value)}
            appearance="filled-darker"
          />
        </div>
        <div className="filter-group">
          <Label weight="semibold" className="filter-label">
            <FilterRegular className="label-icon" />
            <span>Type</span>
          </Label>
          <Dropdown
            placeholder="Select Type"
            onOptionSelect={handleDropdownChange(setTypeFilter, true)}
            appearance="filled-darker"
            className="filter-dropdown"
          >
            {typeOptions.map((option) => (
              <Option key={option.key} value={option.key}>
                {option.label}
              </Option>
            ))}
          </Dropdown>
        </div>
        {selectedType === EnvTypes.boolean.toString() && (
          <div className="filter-group">
            <Label weight="semibold" className="filter-label">
              <FilterRegular className="label-icon" />
              <span>Current Value</span>
            </Label>
            <Dropdown
              placeholder="Select Value"
              onOptionSelect={handleDropdownChange(setValueFilter)}
              appearance="filled-darker"
              className="filter-dropdown"
            >
              {valueOptions.map((option) => (
                <Option key={option.key} value={option.key}>
                  {option.label}
                </Option>
              ))}
            </Dropdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterSection;
