import { Component } from '@angular/core';
import { AlertController, NavController, Platform } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePicker } from '@ionic-native/date-picker';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { NetworkEngineProvider } from '../../providers/network-engine/network-engine';
@Component({
  selector: 'page-hometwo',
  templateUrl: 'hometwo.html'
})
export class HometwoPage {

     responseTxt:any;
    response:any;
  parsedData:any;
  displayData:any;
  send:any;

   myname :any;
  myprice:any;
  mychange:any;
  myvolume:any;
   /**
    * @name form
    * @type {FormGroup}
    * @public
    * @description              References a FormGroup object for use
                                with form validation/management
    */
   public form                  : FormGroup;

   allnotifications: any[] = [];
    days: any[];


   /**
    * @name notification
    * @type {String}
    * @public
    * @description              Stores the title for the local notification
    */
   public notification : string;




   /**
    * @name summary
    * @type {String}
    * @public
    * @description              Stores the message supplied by the local notification
    */
   public summary : string;




   /**
    * @name published
    * @type {String}
    * @public
    * @description              Stores the published date supplied for the local notification
    */
   public published : any;




   /**
    * @name notificationExists
    * @type {Boolean}
    * @public
    * @description              Determines whether a notification has been scheduled or not
    */
   public notificationExists : boolean   = false;




   // Initialise component/plugin modules
   constructor(public navCtrl 	: NavController,
   			   private _ALERT   : AlertController,
   			   private _FB      : FormBuilder,
   			   private _DATE 	: DatePicker,
   			   private _LOCAL   : LocalNotifications,
           public network: NetworkEngineProvider,
   			   private _PLAT    : Platform)


   {
      this.form 		= 	this._FB.group({
         'notification'   : ['', Validators.required],
         'summary'   	  : ['', Validators.required],
         'published'      : ['', Validators.required]
      });

       this.days = [
            {title: 'Monday', dayCode: 1, checked: false},
            {title: 'Tuesday', dayCode: 2, checked: false},
            {title: 'Wednesday', dayCode: 3, checked: false},
            {title: 'Thursday', dayCode: 4, checked: false},
            {title: 'Friday', dayCode: 5, checked: false},
            {title: 'Saturday', dayCode: 6, checked: false},
            {title: 'Sunday', dayCode: 0, checked: false}
        ];


   this.network.readTable().then(data=>
    {
     this.response=""+JSON.stringify(data);
    //console.log("I received: "+JSON.stringify(data));
    //this.responseTxt=JSON.stringify(data);
     this.responseTxt=JSON.stringify(data);
    this.parsedData = JSON.parse(this.responseTxt);

    this.send= this.parsedData.sort(function(a, b) {
           return b.price - a.price;
      });

    this.displayData = this.send.slice(0,5);
   
    this.myname=this.displayData[0].name;
     
    this.myprice=this.displayData[0].price;
    this.myvolume=this.displayData[0].volume/1000;
    this.mychange=this.displayData[0].change;

   // this.scheduleNotification();

   });
   }


      // Set up form validation - VERY basic
    

 

   


   /**
    * Register click event for Local Notifications on view load
    *
    * @public
    * @method ionViewDidLoad
    * @return {None}
    */
   ionViewDidLoad() : void
   {
      // Trigger notification event listener ONLY when the
      // platform is detected/fully initialised
      this._PLAT
      .ready()
      .then(() =>
      {

         // Register click event listener for each local notification
         this._LOCAL.on('click', (notification, state) =>
         {
            var title 	 		=	notification.title,
            	message  		= 	JSON.parse(notification.data);

            // Display the supplied message to the user
            this.displayAlert(title, message.message);


            // Now hide the Cancel notification button from view
            if(this.notificationExists)
            {
               this.notificationExists = false;
            }

         });

      });
   }




   /**
    * Schedule a Local Notification and inform the user of success/failure
    *
    * @public
    * @method scheduleNotification
    * @param notification  		{String} 		The text for the local notification
    * @param message  			{String} 		The message to be displayed once the local notification has been clicked on
    * @param published  		{String} 		The date/time when the local notification will be published
    * @return {None}
    */

 

   newNotification(notification 	: string,
   						message 		: string,
   						published 		: any) : void
   {
      this._LOCAL.schedule({
         id     :  5,
         title  : 'Stock data!',
         text 	: 'the data',
         at  	: published,
          every: 'week',
         data   : { message : message }

        });


      // If the local notification has been successfully scheduled
      // then inform the user
      if(this._LOCAL.isScheduled(1))
      {
         this.notificationExists = true;
         this.displayAlert('Congratulations', 'Your notification has been successfully scheduled');
      }
      else
      {
         this.displayAlert('Oh-oh!', 'Notification failed. There be gremlins at work here.');
      }
   }

    setSound() {
     if (this._PLAT.is('android')) {
         return 'file://assets/sounds/Rooster.mp3'
       } else {
       return 'file://assets/sounds/Rooster.caf'
     }
}

   scheduleNotification(notification 	: string,
   						message 		: string,
   						published 		: any) : void
   {
      this._LOCAL.schedule({
         id     : 1,
         title  :  "Highest stock"+this.myname,
         text 	: "Price"+this.myprice,
         at  	: published,
         every:"minute",
         led: 'FF0000',
         sound: this.setSound(),
       //  every: 'minute', count: 5 ,
         data   : { message : message }
      });


      // If the local notification has been successfully scheduled
      // then inform the user
      if(this._LOCAL.isScheduled(1))
      {
         this.notificationExists = true;
         this.displayAlert('Congratulations', 'Your notification has been successfully scheduled');
      }
      else
      {
         this.displayAlert('Oh-oh!', 'Notification failed. There be gremlins at work here.');
      }
   }




   /**
    * Cancel a scheduled Local Notification and inform the user of success/failure
    *
    * @public
    * @method cancelNotification
    * @param id  		{Number} 		The id of the local notification to be cancelled
    * @return {None}
    */
   cancelNotification(id : number) : void
   {
      this._LOCAL
      .cancel(id)
      .then((data) =>
      {
         this.notificationExists = false;
         this.displayAlert('Success', 'All notifications have been cancelled');
      })
      .catch((error) =>
      {
         this.displayAlert('Error', error);
      });
   }




   /**
    * Select a date/time
    *
    * @public
    * @method selectDateForScheduling
    * @return {None}
    */
   selectDateForScheduling() : void
   {
      this._DATE.show(
      {
         titleText            : 'Select a date/time for this notification ',
         todayText            : 'Select date',
         nowText              : 'Select time',
         date 			      : new Date(),
         mode 			      : 'datetime',
         androidTheme 	      : this._DATE.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT,
         allowOldDates        : false,
         allowFutureDates     : true
      })
      .then((date : any) =>
      {
         this.published 	 = date;
      })
      .catch((err) =>
      {
         this.displayAlert('Error', err);
      });
   }




   /**
    * Generates a Local Notification for a scheduled date/time
    *
    * @public
    * @method generateReminder
    * @return {None}
    */
   generateReminder() : void
   {
      let notification  : string 		=	this.form.controls['notification'].value,
          summary       : string 		=	this.form.controls['summary'].value,
          published     : string 		=	this.published;

      this.scheduleNotification(notification, summary, published);
      this.clearForm();
   }




   /**
    * Display an alert box
    *
    * @public
    * @method displayAlert
    * @param title 		  		{String} 		The heading for the alert
    * @param message  			{String} 		The message to be displayed
    * @return {None}
    */
   displayAlert(title 		: string,
   				message 	: string) : void
   {
      let alert : any 		=	this._ALERT.create({
         title 		: title,
         subTitle  	: message,
         buttons    : ['Got it']
      });
      alert.present();
   }




   /**
    * Clear the form fields of data
    *
    * @public
    * @method clearForm
    * @return {None}
    */
   clearForm() : void
   {
      this.notification 	= '';
      this.summary 			= '';
      this.published   		= '';
   }


}
