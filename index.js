import { createRoot } from 'react-dom/client';
import './index.css';
import * as React from 'react';
import { PropertyPane } from './property-pane';
import { PivotViewComponent } from '@syncfusion/ej2-react-pivotview';
import { SampleBase } from './sample-base';
import { RadioButtonComponent } from '@syncfusion/ej2-react-buttons';
import * as pivotData from './pivot-data/Pivot_Data.json';

/**
 * PivotView Sample with Edit Options.
 */
/* tslint:disable */
let Pivot_Data = pivotData.data.filter((el) => el.Year == 'FY 2017');
let dataSourceSettings = {
  enableSorting: true,
  columns: [{ name: 'Year' }],
  rows: [
    { name: 'Country' },
    { name: 'Product_Categories', caption: 'Product Categories' },
  ],
  formatSettings: [{ name: 'Amount', format: 'C0' }],
  dataSource: Pivot_Data,
  expandAll: true,
  values: [
    { name: 'In_Stock', caption: 'In Stock' },
    { name: 'Sold', caption: 'Units Sold' },
  ],
  filters: [],

  showColumnGrandTotals: false,
};
export class Editing extends SampleBase {
  pivotObj;
  onRadioChange(args) {
    let id = args.event.target.id;
    if (id === 'inline') {
      this.pivotObj.editSettings.allowCommandColumns = false;
      this.pivotObj.editSettings.mode = 'Normal';
    } else if (id === 'batch') {
      this.pivotObj.editSettings.allowCommandColumns = false;
      this.pivotObj.editSettings.mode = 'Batch';
    } else if (id === 'dialog') {
      this.pivotObj.editSettings.allowCommandColumns = false;
      this.pivotObj.editSettings.mode = 'Dialog';
    } else {
      this.pivotObj.editSettings.allowCommandColumns = true;
    }
  }

  export(e) {
    console.log(e);
  }

  editCompleted(args) {
    console.log(args);
  }

  render() {
    return (
      <div className="control-pane">
        <div className="control-section">
          <div className="col-lg-9 adaptive">
            <button>Save</button>
            <PivotViewComponent
              id="PivotView"
              ref={(pivotview) => {
                this.pivotObj = pivotview;
              }}
              showTooltip={false}
              dataSourceSettings={dataSourceSettings}
              width={'100%'}
              height={'1490'}
              gridSettings={{ columnWidth: 140 }}
              editSettings={{
                allowEditing: true,
                allowAdding: true,
                allowDeleting: true,
                mode: 'Normal',
              }}
              editCompleted={this.editCompleted.bind(this)}
            ></PivotViewComponent>
          </div>
          <div className="col-lg-3 property-section">
            <PropertyPane title="Properties">
              <table
                id="property"
                title="Properties"
                className="property-panel-table"
                style={{ width: '100%', height: '100%' }}
              >
                <tbody>
                  <tr>
                    <td>
                      <div className="row" style={{ margin: '0px' }}>
                        <RadioButtonComponent
                          id="inline"
                          change={this.onRadioChange.bind(this)}
                          checked={true}
                          label="Inline Editing"
                          name="EditOperation"
                          value="Inline Editing"
                        ></RadioButtonComponent>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="row" style={{ margin: '0px' }}>
                        <RadioButtonComponent
                          id="batch"
                          change={this.onRadioChange.bind(this)}
                          label="Batch Editing"
                          name="EditOperation"
                          value="Batch Editing"
                        ></RadioButtonComponent>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="row" style={{ margin: '0px' }}>
                        <RadioButtonComponent
                          id="dialog"
                          change={this.onRadioChange.bind(this)}
                          label="Dialog Editing"
                          name="EditOperation"
                          value="Dialog Editing"
                        ></RadioButtonComponent>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="row" style={{ margin: '0px' }}>
                        <RadioButtonComponent
                          id="cc"
                          change={this.onRadioChange.bind(this)}
                          label="Command Columns"
                          name="EditOperation"
                          value="Command Columns"
                        ></RadioButtonComponent>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </PropertyPane>
          </div>
        </div>
      </div>
    );
  }
}

const root = createRoot(document.getElementById('sample'));
root.render(<Editing />);
