CKEDITOR.dialog.add("syntaxhighlight", function(c) {
    var a = function(f) {
        f = f.replace(/<br>/g, "\n");
        f = f.replace(/&amp;/g, "&");
        f = f.replace(/&lt;/g, "<");
        f = f.replace(/&gt;/g, ">");
        f = f.replace(/&quot;/g, '"');
        return f
    };
    var e = function(f) {
        var f = new Object();
        f.hideGutter = false;
        f.hideControls = false;
        f.collapse = false;
        f.showColumns = false;
        f.noWrap = false;
        f.firstLineChecked = false;
        f.firstLine = 0;
        f.highlightChecked = false;
        f.highlight = null;
        f.lang = null;
        f.code = "";
        return f
    };
    var b = function(i) {
        var h = e();
        if (i) {
            if (i.indexOf("brush") > -1) {
                var g = /brush:[ ]{0,1}(\w*)/.exec(i);
                if (g != null && g.length > 0) {
                    h.lang = g[1].replace(/^\s+|\s+$/g, "")
                }
            }
            if (i.indexOf("gutter") > -1) {
                h.hideGutter = true
            }
            if (i.indexOf("toolbar") > -1) {
                h.hideControls = true
            }
            if (i.indexOf("collapse") > -1) {
                h.collapse = true
            }
            if (i.indexOf("first-line") > -1) {
                var g = /first-line:[ ]{0,1}([0-9]{1,4})/.exec(i);
                if (g != null && g.length > 0 && g[1] > 1) {
                    h.firstLineChecked = true;
                    h.firstLine = g[1]
                }
            }
            if (i.indexOf("highlight") > -1) {
                if (i.match(/highlight:[ ]{0,1}\[[0-9]+(,[0-9]+)*\]/)) {
                    var f = /highlight:[ ]{0,1}\[(.*)\]/.exec(i);
                    if (f != null && f.length > 0) {
                        h.highlightChecked = true;
                        h.highlight = f[1]
                    }
                }
            }
            if (i.indexOf("ruler") > -1) {
                h.showColumns = true
            }
            if (i.indexOf("wrap-lines") > -1) {
                h.noWrap = true
            }
        }
        return h
    };
    var d = function(g) {
        var f = "brush:" + g.lang + ";";
        if (g.hideGutter) {
            f += "gutter:false;"
        }
        if (g.hideControls) {
            f += "toolbar:false;"
        }
        if (g.collapse) {
            f += "collapse:true;"
        }
        if (g.showColumns) {
            f += "ruler:true;"
        }
        if (g.noWrap) {
            f += "wrap-lines:false;"
        }
        if (g.firstLineChecked && g.firstLine > 1) {
            f += "first-line:" + g.firstLine + ";"
        }
        if (g.highlightChecked && g.highlight != "") {
            f += "highlight: [" + g.highlight.replace(/\s/gi, "") + "];"
        }
        return f
    };
    return{title:c.lang.syntaxhighlight.title,minWidth:500,minHeight:400,onShow:function() {
        var i = this.getParentEditor();
        var h = i.getSelection();
        var g = h.getStartElement();
        var k = g && g.getAscendant("pre", true);
        var j = "";
        var f = null;
        if (k) {
            code = a(k.getHtml());
            f = b(k.getAttribute("class"));
            f.code = code
        } else {
            f = e()
        }
        this.setupContent(f)
    },onOk:function() {
        var h = this.getParentEditor();
        var g = h.getSelection();
        var f = g.getStartElement();
        var k = f && f.getAscendant("pre", true);
        var i = e();
        this.commitContent(i);
        var j = d(i);
        if (k) {
            k.setAttribute("class", j);
            k.setText(i.code)
        } else {
            var l = new CKEDITOR.dom.element("pre");
            l.setAttribute("class", j);
            l.setText(i.code);
            h.insertElement(l)
        }
    },contents:[
        {id:"source",label:c.lang.syntaxhighlight.sourceTab,accessKey:"S",elements:[
            {type:"vbox",children:[
                {id:"cmbLang",type:"select",labelLayout:"horizontal",label:c.lang.syntaxhighlight.langLbl,"default":"ruby",widths:["25%","75%"],items:[
                    ["Bash (Shell)","bash"],
//                    ["C#","csharp"],
                    ["C++","cpp"],
                    ["CSS","css"],
//                    ["Delphi","delphi"],
//                    ["Diff","diff"],
//                    ["Groovy","groovy"],
                    ["Javascript","jscript"],
                    ["Java","java"],
//                    ["Java FX","javafx"],
                    ["Perl","perl"],
                    ["PHP","php"],
                    ["Plain (Text)","plain"],
                    ["Python","python"],
                    ["Ruby","ruby"],
//                    ["Scala","scala"],
                    ["SQL","sql"],
//                    ["VB","vb"],
                    ["XML/XHTML","xml"]
                ],setup:function(f) {
                    if (f.lang) {
                        this.setValue(f.lang)
                    }
                },commit:function(f) {
                    f.lang = this.getValue()
                }}
            ]},
            {type:"textarea",id:"hl_code",rows:22,style:"width: 100%",setup:function(f) {
                if (f.code) {
                    this.setValue(f.code)
                }
            },commit:function(f) {
                f.code = this.getValue()
            }}
        ]},
        {id:"advanced",label:c.lang.syntaxhighlight.advancedTab,accessKey:"A",elements:[
            {type:"vbox",children:[
                {type:"html",html:"<strong>" + c.lang.syntaxhighlight.hideGutter + "</strong>"},
                {type:"checkbox",id:"hide_gutter",label:c.lang.syntaxhighlight.hideGutterLbl,setup:function(f) {
                    this.setValue(f.hideGutter)
                },commit:function(f) {
                    f.hideGutter = this.getValue()
                }},
                {type:"html",html:"<strong>" + c.lang.syntaxhighlight.hideControls + "</strong>"},
                {type:"checkbox",id:"hide_controls",label:c.lang.syntaxhighlight.hideControlsLbl,setup:function(f) {
                    this.setValue(f.hideControls)
                },commit:function(f) {
                    f.hideControls = this.getValue()
                }},
                {type:"html",html:"<strong>" + c.lang.syntaxhighlight.collapse + "</strong>"},
                {type:"checkbox",id:"collapse",label:c.lang.syntaxhighlight.collapseLbl,setup:function(f) {
                    this.setValue(f.collapse)
                },commit:function(f) {
                    f.collapse = this.getValue()
                }},
                {type:"html",html:"<strong>" + c.lang.syntaxhighlight.showColumns + "</strong>"},
                {type:"checkbox",id:"show_columns",label:c.lang.syntaxhighlight.showColumnsLbl,setup:function(f) {
                    this.setValue(f.showColumns)
                },commit:function(f) {
                    f.showColumns = this.getValue()
                }},
                {type:"html",html:"<strong>" + c.lang.syntaxhighlight.lineWrap + "</strong>"},
                {type:"checkbox",id:"line_wrap",label:c.lang.syntaxhighlight.lineWrapLbl,setup:function(f) {
                    this.setValue(f.noWrap)
                },commit:function(f) {
                    f.noWrap = this.getValue()
                }},
                {type:"html",html:"<strong>" + c.lang.syntaxhighlight.lineCount + "</strong>"},
                {type:"hbox",widths:["5%","95%"],children:[
                    {type:"checkbox",id:"lc_toggle",label:"",setup:function(f) {
                        this.setValue(f.firstLineChecked)
                    },commit:function(f) {
                        f.firstLineChecked = this.getValue()
                    }},
                    {type:"text",id:"default_lc",style:"width: 15%;",label:"",setup:function(f) {
                        if (f.firstLine > 1) {
                            this.setValue(f.firstLine)
                        }
                    },commit:function(f) {
                        if (this.getValue() && this.getValue() != "") {
                            f.firstLine = this.getValue()
                        }
                    }}
                ]},
                {type:"html",html:"<strong>" + c.lang.syntaxhighlight.highlight + "</strong>"},
                {type:"hbox",widths:["5%","95%"],children:[
                    {type:"checkbox",id:"hl_toggle",label:"",setup:function(f) {
                        this.setValue(f.highlightChecked)
                    },commit:function(f) {
                        f.highlightChecked = this.getValue()
                    }},
                    {type:"text",id:"default_hl",style:"width: 40%;",label:"",setup:function(f) {
                        if (f.highlight != null) {
                            this.setValue(f.highlight)
                        }
                    },commit:function(f) {
                        if (this.getValue() && this.getValue() != "") {
                            f.highlight = this.getValue()
                        }
                    }}
                ]},
                {type:"hbox",widths:["5%","95%"],children:[
                    {type:"html",html:""},
                    {type:"html",html:"<i>" + c.lang.syntaxhighlight.highlightLbl + "</i>"}
                ]}
            ]}
        ]}
    ]}
});