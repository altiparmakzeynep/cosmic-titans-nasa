using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;
using DG.Tweening;
using Unity.VisualScripting;
using UnityEngine.Assertions.Must;

public class Player : MonoBehaviour,IAttackable
{
    public static Player instance;
    public Transform collectPoint;
    [SerializeField] Text generatorInteractionText;
    [SerializeField] GameObject mineResources;
    [SerializeField] Image croshair;
    [SerializeField] Image healthBar;
    [SerializeField] Text resourcesText;
    [SerializeField] bool totorial;
    [SerializeField] bool isOpened;
    [SerializeField] Transform startPose;

    [SerializeField] GameObject Creature1;
    public int resourcesCount;
    public int health;

   // public Resource[] resources;

    float timer,healthTimer;

    public void Hit(int damage)
    {
        health -= damage;

        if (health<=0)
        {
            transform.position = startPose.position;

            health = 30;
        }
    }

    private void Update()
    {
        healthBar.fillAmount = health / 100.0f;

        if (health<100)
        {
            if (healthTimer < Time.time)
            {
                health++;
                healthTimer = Time.time + 0.5f;

            }
               
           
        }

        resourcesText.text = resourcesCount.ToString();

        Ray ray = Camera.main.ScreenPointToRay(Input.mousePosition);

        if (Physics.Raycast(ray, out RaycastHit hit2, 20))
        {
            if (hit2.collider.GetComponent<Enemy>()!=null)
            {

                croshair.color = Color.green;
            }
            else if(hit2.collider.GetComponent<Mine>() != null)
            {
                if (!hit2.collider.GetComponent<BoxCollider>().isTrigger)
                {
                    croshair.color = Color.green;
                }
               
            }
            else if (hit2.collider.GetComponent<NewCrature>() != null)
            {
                if (!hit2.collider.GetComponent<BoxCollider>().isTrigger && !isOpened)
                {
                    croshair.color = Color.green;
                    Creature1.SetActive(true);
                    isOpened = true;
                }
            }

            else
            {
                croshair.color = Color.white;

            }

        }
        else
        {
            croshair.color = Color.white;
        }

            if (Physics.Raycast(ray, out RaycastHit hit, 10))
        {
            if (hit.collider.GetComponent<Generator>()!=null)
            {
                generatorInteractionText.gameObject.SetActive(true);

                if (Input.GetKey(KeyCode.E))
                {
                    
                   
                    if (timer <= Time.time && resourcesCount >= 1)
                    {
                        GameObject resource = Instantiate(mineResources, collectPoint.position,collectPoint.rotation);

                        resource.transform.DOMove(hit.collider.GetComponent<Generator>().collectPoint.position,0.45f);

                        timer =Time.time + 0.1f;
                        
                        resourcesCount--;

                        if (totorial)
                        {
                           
                                GetComponent<Totorial>().finish = true;

                            
                        }
                    }

                }
            }

            else
            {
            
                generatorInteractionText.gameObject.SetActive(false);
            }


        }
        else
        {
          
            generatorInteractionText.gameObject.SetActive(false);
        }

    }

    private void OnCollisionStay(Collision collision)
    {
        if (collision.collider.GetComponent<Water>() != null)
        {
            BaseManager.instance.heatLevel -= BaseManager.instance.heatDecreaseRate * Time.deltaTime;
            if (BaseManager.instance.heatLevel <= 0)
            {
                transform.position = startPose.position;

                health = 30;
            }
        }
        if (collision.collider.CompareTag("Base"))
        {
            BaseManager.instance.heatLevel += BaseManager.instance.heatDecreaseRate * Time.deltaTime;

        }

    }



    public void StartGame()
    {
        AsyncOperation operation = SceneManager.LoadSceneAsync(2);
    }

    private void Awake()
    {
        instance = this;
    }
}


[System.Serializable]
public class Resource
{
    public Resources.ResourcesType resourcesType;
    public int Count;

}
