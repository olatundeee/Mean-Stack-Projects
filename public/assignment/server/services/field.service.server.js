/**
 * Created by Sanil on 3/18/2016.
 */
module.exports = function(app, formModel, userModel) {
    app.get("/api/assignment/form/:formId/field", findAllFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldByIdForForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldByIdForForm);
    app.post("/api/assignment/form/:formId/field", createFieldForForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldByIdForForm);
    app.put("/api/assignment/form/:formId/field", reOrderFieldForForm);


    function reOrderFieldForForm(req,res){
        var formId = req.params.formId;
        var startIndex = req.query.startIndex;
        var endIndex = req.query.endIndex;

        if(startIndex && endIndex) {
            formModel
                .sortField(formId, startIndex, endIndex)
                .then(
                    function(stat) {
                        return formModel.findAllFieldsForForm(formId);
                    },
                    function(err) {
                        res.status(400).send(err);
                    }
                )
                .then(
                    function(form) {
                        res.json(form.fields);
                    },
                    function(err) {
                        res.status(400).send(err);
                    }
                );
        }
    }

    function findAllFieldsForForm(req, res) {
        var formId = req.params.formId;
        formModel
            .findAllFieldsForForm(formId)
            .then(
                function (doc) {
                    res.json(doc)
                },

                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findFieldByIdForForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        formModel
            .findFieldByIdForForm(formId, fieldId)
            .then(
                function (doc) {
                    res.json(doc)
                },

                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteFieldByIdForForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        formModel
            .deleteFieldByIdForForm(formId, fieldId)
            .then(
                function (doc) {
                    res.json(doc)
                },

                function (err) {
                    res.status(400).send(err);
                }
            );
    }


    function createFieldForForm(req, res) {
        var formId = req.params.formId;
        var newField = req.body;
        //console.log("Field Service"+newField);
        //console.log("I am here");
        formModel
            .createFieldForForm(formId, newField)
            .then(
                function (doc) {
                    console.log(doc);
                    res.json(doc)
                },

                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateFieldByIdForForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var updatedField = req.body;
        console.log("HIHIHI"+updatedField);
        formModel
            .updateFieldByIdForForm(formId, fieldId, updatedField)
            .then(
                function (doc) {
                    res.json(doc)
                },

                function (err) {
                    res.status(400).send(err);
                }
            );
    }
}
