**BuggedStories:** Aimed at identifying, documenting and resolving bugs found in the US, both at documentation and implementation level, to improve the user experience and ensure that the system works correctly.

##### **Fixed bugs:**

#### **Bug #1**: Incorrect post sorting. (AC2) (only back-end)

**Back-end:** The sorting was being done by the primary key of the post, instead of the creation date. The validation was corrected and the sorting is now done by the creation date.

[Link to the commit](https://github.com/Departamento-de-Engenharia-Informatica/switch-qa-23-project-switch-qa-23-4/commit/7cb425140ada8f3f9293f6ed65d0884b51fd2840)

**Bug fix date:** 2023/10/06 [Link to the commit](https://github.com/Departamento-de-Engenharia-Informatica/switch-qa-23-project-switch-qa-23-4-elainne/commit/7cb425140ada8f3f9293f6ed65d0884b51fd2840)
=======

![Sequence Diagram](../03.sequence-diagram/svg/us001-sequence-diagram.svg)