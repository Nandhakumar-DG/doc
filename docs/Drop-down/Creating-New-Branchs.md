---
sidebar_position: 1
---
# Creating a New Branch in Github
ways to create a new branch in Git!
<!-- This is how comment line Works -->
First, go to the project’s root folder.
## Create a branch (without switching)
In Git, you can create a new branch without moving from your current branch.
This is useful when you want to prepare a branch but continue working on the current one.

As you can see, we are in the home directory. We need to move to the directory where the project exists.

![git_branch_creation_0](/img/git_branch_creation_0.png)

In my case, I moved to the directory where my project exists and used the following command to view all the branches used in the project.

```jsx title="bash"
git branch
```

![git_branch_creation_1](/img/git_branch_creation_1.png)

You can also see the highlighted branch, which is the one I am currently on. This is the **develop** branch, and it contains the latest updates of the project. If you are not on the appropriate branch, switch to the branch where all the updates are available. If you want to move to another branch use the following command.

```jsx title="bash"
git checkout <branch-name>
```














**1)** If you want to type a paragraph just type like this → Lets see How it Works !!!!!!

**2)** If you want to bold a phrase do like this → Ha ha **It works Exactly how it should be but i wonder how it works**

**3)** If you want to highlight a word do it like this → Copy this link and paste to google to access youtube `https//:youtube.com/`

**4)** If you want to show a code that can be copied form the site itself means do like this 
```
Print("Hello world")
```

**5)** If you want a title and color for the program for the above code means do like this →
```jsx title="Hello World Program"
Print("Hello world")
```

**6)** If you want to do hyperlink means do like this → [https://www.youtube.com/](https://www.youtube.com/)

**7)** If you want to add bullet points means do like this →
- point 1
- point 2
- point 3

**8)** If you want to create a title or sub headings means do like this → 
# Hello <!-- Heading  -->
## Hello <!-- Heading With #  -->
### Hello <!-- Heading With Little font and # -->
#### Hello <!-- Heading With Little font and # -->

**9)** If you want to Show a Image give command like this 

![Docusaurus logo](/img/docusaurus.png) <!-- The img file should be in the respective folder -->

**10)** If you want a highlighiting thing means do like this 

:::tip[tip logo]

Use this awesome feature to add a tip if suddenly needed which is very much highlighted 
:::

:::danger[Danger logo]

Use this awesome feature to add a danger which is very much highlighted 

:::

**11)** If you want button like this you can also add css here like this

export const Highlight = ({children, color}) => (
  <span
    style={{
      backgroundColor: color,
      borderRadius: '10px',
      color: '#fff',
      padding: '5px',
      cursor: 'pointer',
    }}
    onClick={() => {
      alert(`You clicked the color ${color} with label ${children}`);
    }}>
    {children}
  </span>
);

This is <Highlight color="#25c2a0">Docusaurus green</Highlight> !

This is <Highlight color="#1877F2">Facebook blue</Highlight> !
