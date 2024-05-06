function init()
{
    var scene = new THREE.Scene();
    var box = getBox(1,1,1);
    var plane = getPlane(4);
    var sphere = getSphere(0.5, 40, 14)
    var capsule = getCapsule(0.2, 2, 6, 8);
    var ico = getIcosahedron(0.6);

    plane.name = 'plane-1';
    box.name = 'box-1';
    sphere.name = 'sphere-1';
    capsule.name = 'cap-1';
    ico.name = 'ico-1';
    
    box.position.y = box.geometry.parameters.height/2;
    plane.rotation.x = Math.PI/2;
    plane.position.y = 1;
    sphere.position.x = -4;
    sphere.position.y = 2;
    capsule.position.x = 2;
    ico.position.x = -3;
    ico.position.z = 1;

    plane.add(sphere);
    plane.add(box);

    scene.add(capsule);
    scene.add(plane);
    scene.add(ico);
    

    var camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth/window.innerHeight,
        1,
        1000);

    camera.position.x = 1;
    camera.position.y = 2;
    camera.position.z = 5;


    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('webgl').appendChild(renderer.domElement);
    update(renderer, scene, camera);

    return scene;

}

let d = 0;
function update(renderer, scene, camera) {
    renderer.render(scene, camera);

    var plane = scene.getObjectByName('plane-1');
    var box = scene.getObjectByName('box-1');
    var sphere = scene.getObjectByName('sphere-1');
    var cap = scene.getObjectByName('cap-1');
    var ico = scene.getObjectByName('ico-1');

    plane.rotation.y += 0.001; //phép biến đổi quay theo trục y
    plane.rotation.x += 0.001; //phép biến đổi quay theo trục x
    
    box.scale.z += 0.004; //phép biến đổi tỉ lệ theo trục z
    box.position.y += 0.002; //phép biến đổi tịnh tiến theo trục y
        
    sphere.rotation.x += 0.01; //phép biến đổi quay theo trục x
    sphere.position.x += Math.sin(d)/16; //phép biến đổi tịnh tiến theo trục x
    sphere.position.y += Math.cos(d)/16; //phép biến đổi tịnh tiến theo trục y
        
    cap.rotation.x += 0.01; //phép biến đổi quay theo trục x
    cap.position.x += 0.001; //phép biến đổi tịnh tiến theo trục x
    cap.scale.y += 0.001; //phép biến đổi tỉ lệ theo trục y
        
    ico.position.z += 0.01; //phép biến đổi tịnh tiến theo trục x
        

    camera.position.set(Math.sin(d/20)*8, Math.abs(Math.sin(d/60))*8, Math.cos(d/20)*8);
    camera.up.set(0, Math.sin(d) + 1, 0); //thay đổi thông số VRP của camera
    camera.lookAt(new THREE.Vector3(0, Math.sin(d/4), 0)); //thay đổi thông số camera LookAt

    requestAnimationFrame(function() {
        update(renderer, scene, camera);
    })
    d+=.1;
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

function getSphere(r, w, h) {
    var geometry = new THREE.SphereGeometry(r, w, h); 
    var material = new THREE.MeshBasicMaterial({ color: 0x4b0082, wireframe: true});
    var sphere = new THREE.Mesh(geometry, material);
    return sphere;
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

init();