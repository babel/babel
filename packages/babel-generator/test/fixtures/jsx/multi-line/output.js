const Foobar = () => {
  return <div>
      <oj-input-number label-hint="readonly currency short" id="inputTextShortNumber" value="{{currencyRoundDuringParse}}" readonly instruction="Enter an amount in field and the formatted currency
                      will be displayed in readonly field below" converter="[[usdShortNumberConverter]]"></oj-input-number>
    </div>;
};