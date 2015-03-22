import Ember from 'ember';
import config from '../config/environment';
import Courses from '../models/courses';

export default Ember.Controller.extend({

    courses: [],
    coursesLimit: 10,

    actions: {

        findCourses: function() {
            var courses = Courses.findAll({
                limit: this.get('coursesLimit')
            });
            this.set('courses', courses);
        }

    }

});
