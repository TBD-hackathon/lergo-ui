'use strict';

angular.module('lergoApp')
    .controller('CreateLessonCtrl', function ($scope) {

        var QUIZ_TYPE = "quiz";

        $scope.lesson = { 'title':'confusing words: they\'re,their,there','steps': [{ 'name':'quiz', 'type':QUIZ_TYPE, 'questions':[]}], 'language':'English', 'subject':'Math','languages':['Espanol','English']};
        $scope.selected = { step: $scope.lesson.steps[0], question: null};


        function _addQuestionToStep( step, newQuestion ){
            step.questions.push( newQuestion );
        }


        function _newQuestion(){
            return {'useMedia':'no','difficulty':'1', 'addHint':'no','type':1,'addExplanation':'no', options:[]};
        }

        function _getStepsByType( type ){
            return $.grep($scope.lesson.steps, function( item, index ){ return item.type == type; });
        }

        function _init() {
            var quizzes = _getStepsByType(QUIZ_TYPE);
            $.each(quizzes, function (index, item) {
                _addQuestionToStep(item, _newQuestion());
                $.each(item.questions, function (qIndex,qItem) {
                    $scope.addAnswerOption(qItem);
                    $scope.addAnswerOption(qItem);
                })
            });
            $scope.selected.step = quizzes[0];
            $scope.selected.question = quizzes[0].questions[0];

        }

        $scope.characters = [
            {'img': '/images/characters/character1.png'},
            {'img': '/images/characters/character2.png'},
            {'img': '/images/characters/character3.png'},
            {'img': '/images/characters/character4.png'},
            {'img': '/images/characters/character5.png'},
            {'img': '/images/characters/character6.png'}
        ];
        $scope.availableSubjects = ['Math','Computers'];

        $scope.addStep = function (lesson) {
            $scope.selected.step = {'name': 'new step', 'showAnimated':'yes', 'character':$scope.characters[0]};
            lesson.steps.push($scope.selected.step);

        };

        $scope.apply = function (lesson) {
            console.log(['applying', lesson]);
        };

        $scope.delete = function (lesson, step) {
            lesson.steps.splice(lesson.steps.indexOf(step));
        };

        $scope.addAnswerOption = function( question ){
            question.options.push({});
        };

        $scope.getTemplateName = function( step ){
            var template = '_lessonStep';
            if ( step.type == 'quiz'){
                template= '_quizStep';
            }

            return 'views/lesson/' + template + '.html'
        };

        $scope.addQuestion = function( step ){
            var newQuestion = _newQuestion();
            _addQuestionToStep( step, newQuestion );
            $scope.selected.question = newQuestion;
        };

        $scope.removeQuestion = function( step, question ){
            step.questions.splice( step.questions.indexOf(question),1);
            if ( $scope.selected.question == question ){
                $scope.selected.question = null;
            }
        };

        $scope.selectQuestion = function( question ){
            $scope.select.question = question;
        };

        $scope.markOptionAsCorrect = function( question,option ){
            console.log("marking option as correct");
            for ( var i = 0; i < question.options.length; i ++){
                question.options[i].correct = false;
            }
            option.correct = true;
        };

        $scope.questionTypeOptions = [{'id':1, 'label':'multiple choice'},{'id':2, 'label':'fill in the blank'}];

        _init();
    });
