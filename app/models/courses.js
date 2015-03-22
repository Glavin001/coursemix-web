import BaseModel from './base';

var CoursesModel = BaseModel.extend({

});

CoursesModel.reopenClass({
    _endpoint: "courses"
});

export default CoursesModel;
