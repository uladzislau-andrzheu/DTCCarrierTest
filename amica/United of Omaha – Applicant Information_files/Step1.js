
$(function () {
    // DOM Rdy
    DuplicateItemController();
    AddBirthCountryLogic();
    CatchOverMaxInsurancePolicy();
    //StateSpecific_PreviousInsurance(); // No longer needed as of January 7 2014 Release
});

function AddBirthCountryLogic() {
    $('#BirthCountry').change(function () {
        // Show/hide Birth Country
        var isAmerica = $(this).val().trim() === 'USA';
        $('#BirthStateWrap').toggle(isAmerica);

        //Other country
        var isOther = $(this).val().trim() === 'ZZZ';
        $('#OtherCountryWrap').toggle(isOther);
    }).trigger('change');
}

function CatchOverMaxInsurancePolicy() {
    // Event
    $('body').on('duplicateupdate', HandleOverMax);

    function HandleOverMax(e, data) {
        if (data.type == "maxReached") {
            //alert('hit the max of: ' + data.itemCount + '/' + data.itemMax + ' items');
        }
    }
}

function StateSpecific_PreviousInsurance() {
    var stateList = ['CT', 'IN', 'DE', 'DC', 'KS', 'MS', 'ID', 'IL', 'MI', 'MN', 'MS', 'NV', 'ND', 'OK', 'PA', 'SD', 'TN', 'WY'];
    var $outsideStateMsg = $('#StateIssue_ExistingLifeInsurance');

    $('#ResidenceAddress_State, [name="DoesProposedInsuredHaveContractsWithOther"]').on('change', function () {
        PerformStateCheck();
    });
    $('#ExistingLifeInsuranceList').on('change', '[type="checkbox"]', function (e) {
        PerformStateCheck();
    });

    function PerformStateCheck() {
        var stateValue = $('#ResidenceAddress_State').val();
        var isReplacedChecked = $('#ExistingLifeInsuranceList').find(':checked').length > 0;
        var isRadioChecked = $('[name="DoesProposedInsuredHaveContractsWithOther"]:checked').val() == "True";
        var isShowMsg = isRadioChecked && isReplacedChecked && $.inArray(stateValue, stateList) !== -1;
        $outsideStateMsg.toggle(isShowMsg);
        if(isShowMsg) {
            $('.formActions [type="submit"]').attr('disabled', 'disabled');
        } else {
            $('.formActions [type="submit"]').removeAttr('disabled');
        }
    }
    PerformStateCheck();    // Initial Run
}

$(document).ready(function () {
    $("#ExistingLifeInsuranceList").on("change", "[type=\"checkbox\"]", function (e) {

        var $outsideStateMsg = $("#StateIssue_ExistingLifeInsurance");

        var isReplacedChecked = $("#ExistingLifeInsuranceList").find(':checked').length > 0;

        var isRadioChecked = $("[name=\"DoesProposedInsuredHaveContractsWithOther\"]:checked").val() === "True";

        var isShowMsg = isRadioChecked && isReplacedChecked; // && $.inArray(stateValue, stateList) !== -1;

        $outsideStateMsg.toggle(isShowMsg);

    });
});