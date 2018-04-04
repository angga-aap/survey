function initialize() {
    var num = get_num()
    $("#title").text(data["1"].title)
    $("#subtitle").text(data["1"].subtitle)
    $("#label").text(data["1"].label)
    $("#number").val("1")
    change_button()
}

function yes() {
    answer()
    increase()
    var num = get_num()
    $("#title").text(data[num].title)
    $("#subtitle").text(data[num].subtitle)
    $("#label").text(data[num].label)
    clear()
    change_button()
}

function no() {
    decrease()
    var num = get_num()
    $("#title").text(data[num].title)
    $("#subtitle").text(data[num].subtitle)
    $("#label").text(data[num].label)
    clear()
    change_button()
}

function increase() {
    var num = parseInt(get_num())
    if(num < Object.keys(data).length)
    {
        $("#number").val(num + 1)
    } else {
        last()
    }
    
}

function decrease() {
    var num = parseInt(get_num())
    if(num - 1 > 0)
        $("#number").val(num - 1)
}

function get_num() {
    return $("#number").val()
}

function clear() {
    var num = get_num()
    $("#answer").val(data[num].answer)
}

function answer() {
    data[get_num()].answer = $("#answer").val()
}

function change_button() {
    var num = get_num()
    var back = data[num].back
    var next = data[num].next
    if(back == undefined)
    {
        $("#back").html("Back")
    } else {
        $("#back").html(data[num].back)
    }
    if(next == undefined)
    {
        $("#next").html("Submit")
    } else {
        $("#next").html(data[num].next)
    }
    if(data[num].last)
    {
        $("#quest-btn").addClass("d-none")
        $("#final-btn").removeClass("d-none")
        $("#rm_input").addClass("d-none")
        if(data[num].final)
            last()
    }
}

function last() {
    $("#quest").addClass("d-none")
    $("#final").removeClass("d-none")
    var num = get_num()
    if(data[num].final)
    {
        $("#failed").addClass("d-none")
        $("#final-btn").addClass("d-none")
    } else {
        $("#final-btn").addClass("d-none")
        $("#success").addClass("d-none")
    }
}

function tidak() {
    var num = get_num()
    data[num].final = false
    last()
}

function terima() {
    var num = get_num()
    data[num].final = true
    last()
}

$("#tidak").click((e) => {
    var data = parseData()
    data["final"] = "Sry guys, coba lagi!"
    e.preventDefault()
    $.ajax({
		url: 'https://www.enformed.io/qr21wx5v',
        method: 'POST',
		data: data,
        dataType: 'json',
        success: () => {
            console.log("success")
        },
        failed: () => {
            console.log("failed")
        }
    });
})

$("#terima").click((e) => {
    var data = parseData()
    data["final"] = "Mantav Soul!"
    e.preventDefault()
    $.ajax({
		url: 'https://www.enformed.io/qr21wx5v',
        method: 'POST',
		data: data,
        dataType: 'json',
        success: () => {
            console.log("success")
        },
        failed: () => {
            console.log("failed")
        }
    });
})

function parseData() {
    val = {}
    $.each(data, (index, value) => {
        val[value.subtitle] = value.answer
    })
    return val
}