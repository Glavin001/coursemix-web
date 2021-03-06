import Ember from 'ember';
import config from '../config/environment';
import Courses from '../models/courses';

export default Ember.Controller.extend({

    _loadSubjects: function() {
        var self = this;
        Courses.subjects()
            .then(function(subjects) {
                console.log(subjects);
                subjects = subjects.map(function(subj) {
                    return {
                        id: subj,
                        text: subj,
                        // description: "The original italian one"
                    };
                });
                self.set('subjects', subjects);
            });

        self.send('storyWelcome');

    }.on('init'),

    subjects: Ember.A(),
    userEmail: "",
    courses: [],
    coursesLimit: 1000,
    selectedSubjects: Ember.A(),

    selectedCourses: [],

    refreshTradeoffs: null,
    problem: {
        "subject": "course",
        "columns": [],
        "options": []
    },

    actions: {

        storyWelcome: function() {
            var self = this;
            self.send('speak', 'Welcome to Course mix', function() {
                return self.send('speak', 'I am Watson. I will guide you through to pick your ideal courses.', function() {

                    // Hide steps
                    $('.step-2, .step-3, .step-4, .step-5').hide();

                    self.send('storyStep1');
                });
            })
        },

        storyStep1: function() {
            var self = this;
            self.send('speak', 'Let\'s get started.', function() {
                self.send('speak', "Please select your preferences and then press continue");
            });
        },
        storyStep2: function() {
            var self = this;
            $('.step-2').show();
            self.send('speak', 'Now select your subjects of interest and press "Find courses"', function() {

            });
        },
        storyStep3: function() {
            var self = this;
            $('.step-3').show();
            self.send('speak', 'Next let\'s submit our courses to be processed by Tradeoff Analytics. Please press "Refresh Tradeoffs" button.', function() {

            });
        },
        storyStep4: function() {
            var self = this;
            $('.step-4').show();
            self.send('speak', "Excellent. Please give me a few moments to process", function() {
                self.send('speak', 'Once I am finished, you can use my tradeoff visualizations to help optimize your course selection.', function() {
                    setTimeout(function() {
                        self.send('speak', 'You can select your course and press "This is my decision" and then and press "Done" button at the top right corner to save the course', function() {
                            self.send('speak', 'You must press the "Done" button to save your course. You can save multiple courses.', function() {

                            });
                        });
                    }, 2000);
                });
            });
        },
        storyStep5: function() {
            var self = this;
            $('.step-5').show();
            self.send('speak', 'You can email your selected courses to yourself to remember to register for them!', function() {

            });
        },

        speak: function(text, cb) {
            console.log('speak', text);

            var url = config.APP.apiHost +
                '/speech/synthesize?text=' + text;

            var audio = $(
                '<audio class="audio" autoplay preload="auto" autobuffer controls></audio>'
            ).get(0);

            // console.log(url);

            $(audio).bind('ended', function() {
                cb();
            });
            audio.setAttribute('src', url);

        },

        emailCourses: function() {
            var email = this.get('userEmail');
            var courses = this.get('selectedCourses');
            Ember.$.post(config.APP.apiHost +
                "/api/courses/email-courses", {
                    "email": email,
                    "courses": JSON.stringify(courses)
                }).then(function() {
                console.log(arguments);
            });

            this.send('speak', 'I have emailed your courses. Enjoy!', function(){

            });

        },

        onResultSelection: function(course) {
            console.log('onResultSelection', course, this);

            var selected = this.get('selectedCourses');

            if (selected.get('length') === 0) {
                this.send('storyStep5');
            }

            selected.pushObject(course);
            this.set('selectedCourses', selected.uniq());

        },

        removeCourse: function(course) {
            var selected = this.get('selectedCourses');
            selected.removeObject(course);
        },

        findCourses: function() {
            var self = this;
            var courses = Courses.findAll({
                where: {
                    "or": self.get('selectedSubjects').map(
                        function(subj) {
                            return {
                                "subject_id": subj
                            };
                        })
                },
                limit: this.get('coursesLimit')
            });
            this.set('courses', courses);

            self.send('storyStep3');

            // courses.then(function(courses) {
            //     courses.forEach(function(course) {
            //         self.send('addCourse', course);
            //     });
            // });
        },

        // addCourse: function(course) {
        //
        //     var selected = this.get('selectedCourses');
        //     selected.pushObject(course);
        //     this.set('selectedCourses', selected.uniq());
        //     course.set('isSelected', true);
        //
        // },

        enableColumn: function(column) {
            console.log(column);
            column.set('enabled', true);
        },
        disableColumn: function(column) {
            column.set('enabled', false);
        },

        refreshOptions: function() {
            var courses = this.get('courses');
            console.log('refreshOptions', courses);

            var problem = this.get('problem');

            if (problem.options.length === 0) {
                this.send('storyStep4');
            }

            var columns = this.get('enabledColumns');

            if (columns.get('length') > 14) {
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
                    "key": course.crn,
                    "name": course.subject_id + " " +
                        course.course_id + "." + course.section +
                        " - " + course.title,
                    "values": {
                        "crn": course.crn,
                        // "subject_id": course.subject_id,
                        // "section": course.section,

                        "begin_time_hours": course.begin_time &&
                            course.begin_time.hours,
                        "begin_time_minutes": course.begin_time &&
                            course.begin_time.minutes,
                        "end_time_hours": course.end_time &&
                            course.end_time.hours,
                        "end_time_minutes": course.end_time &&
                            course.end_time.minutes,

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
                        "prof_overall_quality": Math.random() *
                            5,
                        "prof_average_grade": Math.random() *
                            5,
                        "prof_helpfulness": Math.random() *
                            5,
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

                    },
                    "app_data": {
                        "course": JSON.stringify(course)
                    }
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
    columns: function() {
        var columnGroups = this.get('columnGroups');
        var columns = columnGroups.mapBy('columns');
        var merged = [];
        columns = merged.concat.apply(merged, columns);
        return columns;
    }.property('columnGroups'),

    columnGroups: Ember.A([{
        "name": "Time",
        "description": "Scheduling your classes are work, family, or friends? This will help.",
        "columns": Ember.A([{
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
        }, {
            "key": "online",
            "full_name": "Is Online",
            "type": "NUMERIC",
            "is_objective": false
        }, {
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
            "key": "duration",
            "full_name": "Duration",
            "type": "NUMERIC",
            "is_objective": true,
            "goal": "MIN",
            "enabled": true
        }]).map(function(item) {
            return Ember.Object.create(item);
        })
    }, {
        "name": "Professor",
        "description": "Match yourself up with a professor that meets your needs.",
        "columns": Ember.A([{
            "key": "prof_awards",
            "full_name": "# of Awards Professor has",
            "type": "NUMERIC",
            "is_objective": false
        }, {
            "key": "prof_overall_quality",
            "full_name": "Professor Overall Quality",
            "type": "NUMERIC",
            "enabled": true
        }, {
            "key": "prof_average_grade",
            "full_name": "Professor Average Grade",
            "type": "NUMERIC",
        }, {
            "key": "prof_helpfulness",
            "full_name": "Professor Helpfulness",
            "type": "NUMERIC",
        }, {
            "key": "prof_clarity",
            "full_name": "Professor Clarity",
            "type": "NUMERIC",
        }, {
            "key": "prof_easiness",
            "full_name": "Professor Easiness",
            "type": "NUMERIC",
        }]).map(function(item) {
            return Ember.Object.create(item);
        })
    }, {
        "name": "Social",
        "description": "Class just would not be as much fun without friends to share the experience with!",
        "columns": Ember.A([{
            "key": "tutors",
            "full_name": "# of Tutors",
            "type": "NUMERIC",
            "is_objective": false
        }, {
            "key": "has_facebook_group",
            "full_name": "Has Facebook Group",
            "type": "NUMERIC",
            "is_objective": false
        }, {
            "key": "note_takers",
            "full_name": "# of Note Takers",
            "type": "NUMERIC",
            "is_objective": false
        }, {
            "key": "friends",
            "full_name": "# of Friends in class",
            "type": "NUMERIC",
            "is_objective": true,
            "goal": "MAX",
            "enabled": true
        }]).map(function(item) {
            return Ember.Object.create(item);
        })
    }, {
        "name": "Misc",
        "description": "Miscellaneous columns of data",
        "columns": Ember.A([{
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
        }, {
            "key": "course_id",
            "full_name": "Course Id",
            "type": "NUMERIC",
            "is_objective": true,
            "goal": "MAX",
            "enabled": true
        }, {
            "key": "class_rating",
            "full_name": "Class Rating",
            "type": "NUMERIC",
            "is_objective": true,
            "goal": "MAX",
            "enabled": true
        }]).map(function(item) {
            return Ember.Object.create(item);
        })
    }])

});