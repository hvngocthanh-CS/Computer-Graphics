function init()
{
    var scene = new THREE.Scene();
    var box = getBox(1,1,1);
    var plane = getPlane(4);
    var capsule = getCapsule(0.2, 4, 6, 8);
    var ico = getIcosahedron(0.5) 
    var torus = getTorus(0.2, 0.04, 2, 6);
    var sphere = getSphere(0.5, 40, 16)
    var cylinder = getCylinder(0.4, 0.4, 0.3, 40)
    
    box.position.y = box.geometry.parameters.height/2;
    plane.rotation.x = Math.PI/2;
    capsule.position.x = -1.5;
    capsule.position.z = -1.2;
    ico.position.y = 1.2;
    ico.position.x = 1.5;

    torus.position.x = 1.2;
    torus.position.y = 1;
    torus.position.z = 2.3;

    sphere.position.x = -0.9;
    sphere.position.y = 0.5;
    sphere.position.z = 1.7;

    cylinder.position.x = 1.2;
    cylinder.position.y = 0.5;
    cylinder.position.z = 1.9;

    scene.add(box);
    scene.add(plane);
    scene.add(capsule);
    scene.add(ico);
    scene.add(torus);
    scene.add(sphere);
    scene.add(cylinder);


    var camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth/window.innerHeight,
        1,
        1000);

    camera.position.x = 1;
    camera.position.y = 2;
    camera.position.z = 5;

    camera.lookAt(new THREE.Vector3(0, 0, 0))
    
    var renderer=new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('webgl').appendChild(renderer.domElement);
    renderer.render(scene, camera);

    animate(scene, camera, renderer, capsule);
    animate(scene, camera, renderer, ico);
}
function update(thing) {
    thing.rotation.x += 0.01;
    thing.rotation.y += 0.01;
    thing.rotation.z += 0.01;
}

function animate(scene, camera, renderer, thing) {
    update(thing); // Gọi hàm update() để cập nhật trạng thái của các đối tượng trong cảnh

    renderer.render(scene, camera); // Vẽ lại cảnh

    requestAnimationFrame(function () {
        animate(scene, camera, renderer, thing); // Sử dụng requestAnimationFrame để gọi lại hàm animate() ở lần kế tiếp
    });
}

function getBox(w, h, d)
{
    var geometry = new THREE.BoxGeometry(w,h,d);
    var material = new THREE.MeshBasicMaterial({color:0x00ff00});
    var mesh = new THREE.Mesh(geometry, material);
    return mesh;
}

function getPlane(size)
{
    var geometry = new THREE.PlaneGeometry(size,size);
    var material = new THREE.MeshBasicMaterial({
        color:0xff0000,
        side: THREE.DoubleSide
    });
    var mesh = new THREE.Mesh(geometry, material);
    return mesh;
}

function getCapsule(r, len, cap, radial)
{
    var geometry = new THREE.CapsuleGeometry(r, len, cap, radial); 
    var material = new THREE.MeshNormalMaterial(); 
    var capsule = new THREE.Mesh( geometry, material );
    return capsule;
}

function getIcosahedron(size) {
    var geometry = new THREE.IcosahedronGeometry(size);
    var material = new THREE.MeshBasicMaterial({color: 0x66fcff, wireframe: true});
    var mesh = new THREE.Mesh(geometry, material);
    return mesh;
}

function getTorus(r, tube, tubular, radial) {
    var geometry = new THREE.TorusGeometry(r, tube, tubular, radial); 
    var material = new THREE.MeshBasicMaterial( {color: 0xf6ff1a}); 
    var torus = new THREE.Mesh(geometry, material);
    return torus;
}

function getSphere(r, w, h) {
    var geometry = new THREE.SphereGeometry(r, w, h); 
    var material = new THREE.MeshBasicMaterial({ color: 0x4b0082, wireframe: true});
    var sphere = new THREE.Mesh(geometry, material);
    return sphere;
}

function getCylinder(r_top, r_bot, h, radial) {
    var geometry = new THREE.CylinderGeometry(r_top, r_bot, h, radial); 
    var material = new THREE.MeshBasicMaterial({color: 0xb57edc}); 
    var cylinder = new THREE.Mesh( geometry, material );
    return cylinder
}

init();