# gulp-license-updater


# Install

```javascript
npm install gulp-license-updater --save-dev
```

# Basic Usage

There are three possible usages:
1) Check that the files contains the license:

```javascript
var gulp = require('gulp');
var licenseUpdater = require('gulp-license-updater');

gulp.task('check-license', function () {
    var files = ['core/**/*.js']
    gulp.src(files, {base: './'})
            .pipe(licenseUpdater(
                {
                     action:'check'
                },
                 '/*' + fs.readFileSync('LICENSE', 'utf8') + '*/'
            ))
            .pipe(gulp.dest('./'));
});
```
If the action parameter is equal 'check' then the plugin shows all files which contains the license.
If you want see the files which doesn't contain the license then use the showFilesWithoutLicense: true.

2) Add the license/update the license
```javascript
var gulp = require('gulp');
var licenseUpdater = require('gulp-license-updater');

gulp.task('check-license', function () {
    var files = ['core/**/*.js']
    gulp.src(files, {base: './'})
            .pipe(licenseUpdater(
                {
                     action:'format'
                },
                 '/*' + fs.readFileSync('LICENSE', 'utf8') + '*/',
                 fs.readFileSync('OLD_LICENSE', 'utf8')
            ))
            .pipe(gulp.dest('./'));
});
```
This method replaces the old license by the new license or add the license to file if license is missing in this file.
If the current license is similar to new license then you could skip the OLD_LICENSE parameter.
3) Remove the license:
```javascript
var gulp = require('gulp');
var licenseUpdater = require('gulp-license-updater');

gulp.task('check-license', function () {
    var files = ['core/**/*.js']
    gulp.src(files, {base: './'})
            .pipe(licenseUpdater(
                {
                     action:'remove'
                },
                 '/*' + fs.readFileSync('LICENSE', 'utf8') + '*/'
            ))
            .pipe(gulp.dest('./'));
});
```
Method removes the license from all files.
## Options
**config**:JSON
*action*: one of three possible values check, format or remove.

*rate*: text match rate default value 0.8

*showFilesWithoutLicense*: it works only for 'check' action. If true then it shows the files without true.

**license** new license text
**oldLicense** old license text