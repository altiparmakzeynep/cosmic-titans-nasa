using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using DG.Tweening;
using Unity.VisualScripting;

public class Mine : MonoBehaviour
{
    [SerializeField] Transform[] spawnPoints;
    [SerializeField] Transform spawnPoint,topPoint;
    [SerializeField] GameObject resourcesPrefab;
    [SerializeField] int spawnCount;
    [SerializeField] float time;
    [SerializeField] int health;
    [SerializeField] float respawnTime;
    BoxCollider collider;
    MeshRenderer meshRenderer;
    int startHealth;
    public int money;
    public GameObject MineUI;
    public bool Mined = false;
    [SerializeField] LayerMask openLayer, closeLayer;

    public AudioSource MineSource;


    private void Start()
    {
        startHealth = health;
        collider = GetComponent<BoxCollider>();
        meshRenderer = GetComponent <MeshRenderer>();
    }

    public void Hit()
    {
        transform.DOShakeScale(.35f,1.5f,30,90,true);

        health--;

        int randomPoint;

        MineSource.pitch = (Random.Range(0.8f, 1.1f));

        MineSource.Play();
        
       // Mined = true;
        for (int i = 0; i < spawnCount; i++)
        {
            randomPoint = Random.Range(0, spawnPoints.Length);

            GameObject newResources = Instantiate(resourcesPrefab, spawnPoint.position, spawnPoint.rotation);

            newResources.transform.DOMove(topPoint.position, time).OnComplete(() =>
            {
                //  newResources.transform.DOMove(spawnPoints[randomPoint].position, time);

                //   FollowPlayer(newResources,0.25f);

                StartCoroutine(FollowRoutine(newResources,1f));
               

            }); 


            // GameObject newResources = Instantiate(resourcesPrefab, spawnPoints[randomPoint].position, spawnPoints[randomPoint].rotation);

        }

        if (health<=0)
        {
            StartCoroutine(Respawn(respawnTime));
            meshRenderer.enabled = false;
            collider.isTrigger = true;
            int LayerIgnoreRaycast = LayerMask.NameToLayer("Ignore Raycast");
            gameObject.layer = LayerIgnoreRaycast;
            BaseManager.instance.money += money;


        }
        if (!Mined)
        {
            MineUI.SetActive(true);
            Mined = true;
        }

    }
    
    
    IEnumerator FollowRoutine(GameObject obj,float speed)
    {
        while (true)
        {

            yield return new WaitForSeconds(0f);

            if (obj)
            {
                obj.transform.position = Vector3.Lerp(obj.transform.position, Player.instance.collectPoint.position, 10 * Time.deltaTime*speed);

                speed += 0.2f;



            }
            else
            {
                break;
            }
        }

       


    }

    void FollowPlayer(GameObject obj,float time)
    {
        if (obj.transform.position != Player.instance.collectPoint.transform.position)
        {
            obj.transform.DOMove(Player.instance.collectPoint.transform.position, time/2).OnComplete(() => 
            {

                FollowPlayer(obj,time/5);

                Debug.Log("Round");
            
            });

        }

      
    }

    IEnumerator Respawn(float timer)
    {
        yield return new WaitForSeconds(timer);
        meshRenderer.enabled = true;
        collider.isTrigger = false;
        health = startHealth;
        int DefaultLayer = LayerMask.NameToLayer("Default");
        gameObject.layer = DefaultLayer;

    }
}
