import Ember from 'ember';
import config from '../config/environment';
import Courses from '../models/courses';

export default Ember.Controller.extend({

    courses: [],
    coursesLimit: 100,

    selectedCourses: [],

    refreshTradeoffs: null,
    problem: {
        "subject": "course",
        "columns": [],
        "options": []
    },

    actions: {

        findCourses: function() {
            var self = this;
            var courses = Courses.findAll({
                limit: this.get('coursesLimit')
            });
            this.set('courses', courses);
            courses.then(function(courses) {
                courses.forEach(function(course) {
                    self.send('addCourse', course);
                });
            });
        },

        addCourse: function(course) {

            var selected = this.get('selectedCourses');
            selected.pushObject(course);
            this.set('selectedCourses', selected.uniq());
            course.set('isSelected', true);

        },

        enableColumn: function(column) {
            console.log(column);
            column.set('enabled', true);
        },
        disableColumn: function(column) {
            column.set('enabled', false);
        },

        refreshOptions: function() {
            var courses = this.get('selectedCourses');
            console.log('refreshOptions', courses);

            var problem = this.get('problem');

            var columns = this.get('enabledColumns');

            if (columns.get('length') > 14)
            {
                return;
            }

            var options = courses.map(function(course) {

                var beginTime = course.begin_time ? (course
                        .begin_time.hours +
                        course.begin_time.minutes / 60) : -
                    1;
                var endTime = course.end_time ? (course.end_time
                    .hours +
                    course.end_time.minutes / 60) : -1;
                var duration = (beginTime && endTime) ? (
                    endTime - beginTime) : -1;

                return {
                    "key": course.id,
                    "name": course.title,
                    "values": {
                        "course_id": course.course_id,
                        "on_monday": course.on_monday ? 1 : 0,
                        "on_tuesday": course.on_tuesday ? 1 : 0,
                        "on_wednesday": course.on_wednesday ?
                            1 : 0,
                        "on_thursday": course.on_thursday ?
                            1 : 0,
                        "on_friday": course.on_friday ? 1 : 0,
                        "on_saturday": course.on_saturday ?
                            1 : 0,
                        "on_sunday": course.on_sunday ? 1 : 0,
                        "begin_time": beginTime,
                        "end_time": endTime,
                        "duration": duration,

                        // FIXME
                        "prof_overall_quality": Math.random() * 5,
                        "prof_average_grade": Math.random() * 5,
                        "prof_helpfulness": Math.random() * 5,
                        "prof_clarity": Math.random() * 5,
                        "prof_easiness": Math.random() * 5,

                        "class_rating": Math.random() * 5,
                        "friends": Math.random() * 10,

                        "prof_awards": 0,
                        "tutors": 0,
                        "has_facebook_group": 0,
                        "note_takers": 0,
                        "online": (duration === -1) ? 1 : 0,
                        "uses_powerpoints": 0,
                        "has_lab_or_recitation": 0,
                        "has_tests": 0,
                        "has_essays": 0,
                        "requires_presentations": 0

                    }
                    //, "meta": course
                };
            });

            // console.log('options', options);

            // Done
            problem.columns = JSON.parse(JSON.stringify(columns));
            problem.options = options;

            var refresh = this.get('refreshTradeoffs');
            refresh();

        }

    },

    enabledColumns: Ember.computed.filterBy('columns', 'enabled', true),
    tooManyColumns: Ember.computed.gt('enabledColumns.length', 14),

    columns: Ember.A([{
            "key": "on_monday",
            "full_name": "On Mondays",
            "type": "NUMERIC",
            "is_objective": false,
            "enabled": true
        }, {
            "key": "on_tuesday",
            "full_name": "On Tuesday",
            "type": "NUMERIC",
            "is_objective": false,
            "enabled": true
        }, {
            "key": "on_wednesday",
            "full_name": "On Wednesday",
            "type": "NUMERIC",
            "is_objective": false,
            "enabled": true
        }, {
            "key": "on_thursday",
            "full_name": "On Thursday",
            "type": "NUMERIC",
            "is_objective": false,
            "enabled": true
        }, {
            "key": "on_friday",
            "full_name": "On Friday",
            "type": "NUMERIC",
            "is_objective": false,
            "enabled": true
        }, {
            "key": "on_saturday",
            "full_name": "On Saturday",
            "type": "NUMERIC",
            "is_objective": false,
            "enabled": false
        }, {
            "key": "on_sunday",
            "full_name": "On Sunday",
            "type": "NUMERIC",
            "is_objective": false,
            "enabled": false
        },

        {
            "key": "prof_awards",
            "full_name": "# of Awards Professor has",
            "type": "NUMERIC",
            "is_objective": false
        },
        {
            "key": "tutors",
            "full_name": "# of Tutors",
            "type": "NUMERIC",
            "is_objective": false
        },
        {
            "key": "has_facebook_group",
            "full_name": "Has Facebook Group",
            "type": "NUMERIC",
            "is_objective": false
        },
        {
            "key": "note_takers",
            "full_name": "# of Note Takers",
            "type": "NUMERIC",
            "is_objective": false
        },
        {
            "key": "online",
            "full_name": "Is Online",
            "type": "NUMERIC",
            "is_objective": false
        }, {
            "key": "uses_powerpoints",
            "full_name": "Uses Powerpoints",
            "type": "NUMERIC",
            "is_objective": false
        }, {
            "key": "has_lab_or_recitation",
            "full_name": "Has Lab or Recitation",
            "type": "NUMERIC",
            "is_objective": false
        }, {
            "key": "has_tests",
            "full_name": "Has Tests",
            "type": "NUMERIC",
            "is_objective": false
        }, {
            "key": "has_essays",
            "full_name": "Has Essays",
            "type": "NUMERIC",
            "is_objective": false
        }, {
            "key": "requires_presentations",
            "full_name": "Requieres Presentations",
            "type": "NUMERIC",
            "is_objective": false
        },


        {
            "key": "begin_time",
            "full_name": "Begining Time",
            "type": "NUMERIC",
            "is_objective": true,
            "goal": "MAX",
            "enabled": true
        }, {
            "key": "end_time",
            "full_name": "Ending Time",
            "type": "NUMERIC",
            "is_objective": true,
            "goal": "MIN",
            "enabled": true
        }, {
            "key": "course_id",
            "full_name": "Course Id",
            "type": "NUMERIC",
            "is_objective": true,
            "goal": "MAX",
            "enabled": true
        }, {
            "key": "duration",
            "full_name": "Duration",
            "type": "NUMERIC",
            "is_objective": true,
            "goal": "MIN",
            "enabled": true
        },

        {
            "key": "prof_overall_quality",
            "full_name": "Professor Overall Quality",
            "type": "NUMERIC",
            "enabled": true
        },

        {
            "key": "prof_average_grade",
            "full_name": "Professor Average Grade",
            "type": "NUMERIC",
        },
        {
            "key": "prof_helpfulness",
            "full_name": "Professor Helpfulness",
            "type": "NUMERIC",
        },
        {
            "key": "prof_clarity",
            "full_name": "Professor Clarity",
            "type": "NUMERIC",
        },
        {
            "key": "prof_easiness",
            "full_name": "Professor Easiness",
            "type": "NUMERIC",
        },

        {
            "key": "class_rating",
            "full_name": "Class Rating",
            "type": "NUMERIC",
            "is_objective": true,
            "goal": "MAX",
            "enabled": true
        }, {
            "key": "friends",
            "full_name": "# of Friends in class",
            "type": "NUMERIC",
            "is_objective": true,
            "goal": "MAX",
            "enabled": true
        }
    ]).map(function(item) {
        return Ember.Object.create(item);
    })

});