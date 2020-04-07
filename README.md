## Android deployment
An Android development environment is needed. Instructions for the setup were referenced from https://ionicframework.com/docs/developing/android. Tested on Windows 10.

**Required software:**  
- Android Studio  (AVD not needed)
- Android SDK (included in Studio)
- Node.js  
- npm (included in Node.js)  
- Gradle  
- Ionic CLI  
  * ```npm install -g @ionic/cli```
  
Additional node packages needed:
```
npm install -g native-run
npm install -g cordova
```

### Basic Instructions

Install all the required software.  

Add the following to the Windows Path environment variable:
 - Java SDK, Program Files\jdk-xxxx\bin
 - Gradle, gradle-xxx\bin

Clone the repository.

Use this tool to check if the Android device is connected:  
`%USERPROFILE%\AppData\Local\Android\sdk\platform-tools\adb devices`

Run `ionic cordova run android --device`

A debug version of the application will be built and uploaded to the Android device.


### Tips

#### JDK 8
To download JDK 8 without an Oracle account, copy the Java SE Development Kit link for your platform from here.   https://www.oracle.com/java/technologies/javase-jdk8-downloads.html

Then extract the part of the link after =nexturl and replace "otn" with "otn-bin" so it looks like the following.  
https://download.oracle.com/otn-bin/java/jdk/8u241-b07/1f5b5a70bf22433b84d0e960903adac8/jdk-8u241-windows-x64.exe

#### Android SDK licenses
If the building fails because Android SDK licenses are not accepted, there is a work around.  
Open Android Studio.  
Go to Configure -> SDK Manager.  
Install a random package, like Android SDK Command-line Tools.  
It will prompt you to accept licenses.  

#### ERR_AVD_HOME_NOT_FOUND:
You have to create a folder in  
