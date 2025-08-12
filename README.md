# Medication Reminder Tool

A tool to help people take their medication on time, using a smart pill box, SMS reminders, and a growing virtual plant keeping you accountable.
## Why am I making this?

People often struggle to take medication on time. In the US, 75% of Americans struggle to follow the directions on their prescription medications [1]. With some sort of reminder, adherance has been found to increase from about 54.71% to 66.61% [2]. The source of non-adherance for 
some people may be due to the lack of control they feel when they are precribed a certain change in their lifestyle [3]. Therefore, I wanted to create a tool that helps people feel more in control, even when they're taking precription medication on time. 

## How am I making this?

This system will have a smart pillbox, that will be able to log open and close events. When the user set time occurs, it will send the user a text message reminding them to take their medication. If the user does not open the box within the defined time range, it will send a 
text again as a reminder. To incentivize the user further, by taking their medication on time, they will grow virtual plants where missing doeses halts the plants' growth. My hope is that this system helps a user restore a snese of control 
associated with taking their medication on time. The user will also be able to download a log of their history, in case they wanted to track their porgress on their own. 

## Who is the target audience?

This tool will be for anyone regularly taking precription medication. A user would need stable internet connection and a mobile device, which may be a barrier for some. 
The tool may also not address complex dosing needs. I am designing the project with myself in mind as the target audience, but of course as the project evolves, the better idea I will have of the criteria and contraints of this project. 

## What am I working on right now?

Currently, I have a mock web interface that the user will be able to interact with to see their plant, and an esp32 that is able to log opening and close events and send them to a web server, where a .csv can be downloaded. The first 14 plant drawings have been made now.

## Disclaimer

The project definition will evolve with each iteration I make. None of this is final, and I am learning and trying my best :)

### References
[1] R. M. Benjamin, “Medication Adherence: Helping Patients Take Their Medicines as Directed,” Public Health Reports, vol. 127, no. 1, pp. 2–3, Jan. 2022, doi: https://doi.org/10.1177/003335491212700102.  

[2] C. West, S. Fenerty, S. Feldman, S. Kaplan, and S. Davis, “The effect of reminder systems on patients’ adherence to treatment,” Patient Preference and Adherence, vol. 6, p. 127, Feb. 2012, doi: https://doi.org/10.2147/ppa.s26314.  

[3] “How Emotions Cure the Problem of Medication Non-Adherence,” Psychology Today, 2020. https://www.psychologytoday.com/ca/blog/inside-the-consumer-mind/202009/how-emotions-cure-the-problem-of-medication-non-adherence (accessed Aug. 05, 2025).  
‌
‌
‌
